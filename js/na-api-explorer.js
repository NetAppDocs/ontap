let auth0 = null;
let token = "";

const configureClient = async () => {
  auth0 = await createAuth0Client({
    domain: "netapp-cloud-account.auth0.com",
    client_id: "GDbjOb692SeKIoXQUyD8FcJCDToe9fuZ",
    audience: "https://api.cloud.netapp.com", 
    // useRefreshTokens: true,
    cacheLocation: 'localstorage'
  });
};

const login = async () => {
  await auth0.loginWithRedirect({
    redirect_uri: window.location.origin+'/us-en/cloud/api-callback.html',
    appState: { target: window.location.href }
  });
};

const callApi = async (token, requestData) => {
  let payload = requestData;
  requestUrl = payload.url;
  delete payload.url;
  fetch(requestUrl, payload)
  .then(response => {
    let responseObject = "";
    try {
      responseObject = response.text();
      return responseObject;
    } catch(error) {
      console.error("Unable to parse json object: ", error);
      return response;
    }
  })
  .then(responseMessage => {
    if(typeof responseObject === 'object') {
      responseMessage = JSON.stringify(responseMessage, null, 2); // Attempt to convert into a string
    }
    
    if(typeof responseMessage === 'string' && (responseMessage.startsWith('{') || responseMessage.startsWith('['))) {
      // Format as prettified JSON if string variant: 
      responseMessage = JSON.stringify(JSON.parse(responseMessage), null, 2);
    }

    const responseElement = document.getElementById("response-code");
    responseElement.innerText = responseMessage;
    displayIfActive('#response-code', 'explorer-response');
    
  })
  .catch((error) => {
    console.error('Unable to parse API response: ', error);
    if(typeof error === 'object') {
      error = JSON.stringify(error, null, 2); // Attempt to convert into a string
    }
    
    if(typeof error === 'string' && (error.startsWith('{') || error.startsWith('['))) {
      // Format as prettified JSON if string variant: 
      error = JSON.stringify(JSON.parse(error), null, 2);
    }
    const responseElement = document.getElementById("response-code");
    responseElement.innerText = error;
    displayIfActive('#response-code', 'explorer-response');
  });

  return false;
};


window.onload = async () => {
  $("#preamble").after("<button id='try-it-button' class='api-btn' type='button'><span>Try it out</span></button>");
  await configureClient();
  // const query = window.location.search;
  // if (query.includes("code=") && query.includes("state=")) {
  //   console.log("Handling Redirect Callback...");
  //   console.log("Callback URL: " + document.location.href);
  //   /*
  //   handleRedirectCallback can only be called once. 
  //   Probably should be in callback logic, and see if auth0 can 
  //   read from localStorage between pages using isAuthenticated() 
  //   and getTokenSilently() since login should persist across pages. 
  //   */

  //   redirectResponse = await auth0.handleRedirectCallback();
  //   console.log("Response: "+JSON.stringify(redirectResponse, null, 2));
  //   const url = window.location.origin + '' + window.location.pathname;
  //   console.log("URL is: "+url); 
  //   window.history.replaceState({}, document.title, url);

  //   const redirect_uri = redirectResponse.appState.target;
  //   if (redirect_uri) {
  //     console.log("Redirect URL: "+redirect_uri);
  //     document.location.href = redirect_uri + document.location.search;
  //   } else {
  //     console.log("No valid callback uri was found");
  //   }
  // } else {
    
  // }

  const isAuthenticated = await auth0.isAuthenticated();
  if(!isAuthenticated) {
    $("#try-it-button").click(openPanel);
    $(".side-panel-container").css('display','none');
    $("#api-login-overlay").css('display','block');
  } else {
    token = await auth0.getTokenSilently();
    const userProfile = await auth0.getUser();
    let endpointData = extractEndpoint();
    initializeExplorer(endpointData);
    $("#try-it-button").click(openPanel);
    $(".side-panel-container").css('display','block');
    $("#api-login-overlay").css('display','none');
    openPanel();
    document.getElementById('api-btn-submit').addEventListener('click', submitApiRequest);
  }
}

// Retrieve all parameters from page
function extractEndpoint() {
  let endpoint = {}
  endpoint.operation = $('.api-doc-operation').text();
  endpoint.path = $('.api-doc-code-block code').text();

  endpoint.parameters = [];
  endpoint.parameters = endpoint.parameters.concat(extractTableParameters('parameters'));
  endpoint.parameters = endpoint.parameters.concat(extractTableParameters('request-body'));

  return endpoint;
}

// Extract path, query, and body parameters from HTML for populating the API Explorer. 
function extractTableParameters(header) {
  let parameters = [];
  const headerElement = document.getElementById(header);
  if(!headerElement) return parameters;
  let rows = headerElement.parentElement.querySelectorAll('table > tbody > tr');
  for(let rowFields of rows) {
    let fields = rowFields.querySelectorAll('p.tableblock');
    let parameter = {};
    try {
      parameter['name'] = fields[0].innerText;
      parameter['type'] = fields[1].innerText;
      if(fields.length === 3) {
        parameter['in'] = 'body';
        parameter['required'] = fields[2].innerText;
        const type = parameter['type'].trim().toLowerCase();
        if(type !== 'string' && type !== 'boolean' && type.indexOf('array') == -1 && type.indexOf('string') == -1 && type.indexOf('integer') == -1) {
          // Resolve object definition
          parameter['parameters'] = extractTableParameters(type);
          parameter['type'] = 'object'; // set to common value
        }
      } else if(header === 'parameters' && fields.length === 4) {
        parameter['in'] = fields[2].innerText;
        parameter['required'] = fields[3].innerText;
      } else {
        console.error("Invalid number of parameter fields");
        continue;
      }

      parameters.push(parameter);
    } catch(e) {
      console.error(e.stack());
      return parameters;
    }
  }

  return parameters;
}

function extractDefinition(header) {
  let parameters = [];
  const headerElement = document.getElementById(header);
  if(!headerElement) return parameters;
  let rows = headerElement.parentElement.querySelectorAll('')
}

// Populates the API Explorer display with endpoint info such as parameters. 
function initializeExplorer(endpoint) {
  $('#api-explorer-form').attr('data-operation', endpoint.operation);
  $('#api-explorer-form').attr('data-path', endpoint.path);
  initializeExplorerParameters(endpoint);
  displayIfActive('#explorer-parameters > .row','explorer-parameters');
  displayIfActive('#explorer-headers > .row','explorer-headers');
  displayIfActive('#explorer-body > .row','explorer-body');
}

function displayIfActive(searchCSS, toggleId) {
  if($(searchCSS).children().length > 0 || $(searchCSS).text().length > 0) $('#'+toggleId).css('display','block');
}

function initializeExplorerParameters(endpoint) {
  if(!endpoint.parameters) return;
  let params = endpoint.parameters;
  for(let i=0;i<params.length; i++) {
    const parameter = params[i];
    const type = parameter.type.toLowerCase();
    if(type === 'string') {
      if(parameter.name.toUpperCase() === 'AUTHORIZATION' || parameter.name.toUpperCase() === 'X-AGENT-ID') {
        continue; // Ignoring default parameter
      }

      addExplorerParameter(parameter['name'], type, parameter['in'], parameter['required']);
    } else if(type.indexOf("string") != -1 || type.indexOf("integer") != -1) {
      addExplorerParameter(parameter['name'], type, parameter['in'], parameter['required']); 
    } else if(type.indexOf("array") != -1 || type === 'boolean') {
      addExplorerParameter(parameter['name'], type, parameter['in'], parameter['required']);
    } else if(type.indexOf("object") != -1) {
      addExplorerParameter(parameter['name'], type, parameter['in'], parameter['required'], parameter['parameters']);
    } else {
      console.error('Parameter ['+parameter.name+'] has an unsupported type ['+parameter.type+'].');
      continue;
    }
  }
}

function addExplorerParameter(name, type, location, required, parameters=null) {
  let row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("explorer-row");
  let element = null;
  if(type === "string" || type.indexOf("string") != -1 || type.indexOf("integer") != -1) {
    element = createTextField(name, 'explorer-field');
  } else if(type.indexOf("boolean") != -1) {
    const values = ['','true', 'false'];
    element = createSelect(values);
  } else if(type.indexOf("array") != -1) {
    const formattedTemplate = JSON.stringify(["string"], null, 2);
    element = createCodeBlock(formattedTemplate, "explorer-object");
  } else if(type.indexOf("object") != -1) {
    const template = buildParametersObject(parameters);
    const formattedTemplate = JSON.stringify(template, null, 2);
    element = createCodeBlock(formattedTemplate, "explorer-object");
    if(location) row.classList.add("api-wrap");
  } else {
    console.error("API explorer does not support input type ["+type+"].");
    return;
  }

  if (required.toString().toLowerCase() === 'true') element.required = 'true';
  if (location === 'header' && !element.required) return; // hide optional headers

  // Common fields
  const id = 'explorer-field-'+name.toLowerCase().trim();
  let label = document.createElement("label");
  label.htmlFor = id;
  label.innerHTML = name;
  if(element.required) {
    let requiredLabel = document.createElement('div');
    requiredLabel.classList.add('explorer-field-required');
    requiredLabel.innerHTML = '* required';
    label.appendChild(requiredLabel);
  }
  element.dataset.type = type;
  element.dataset.location = location;
  element.name = name;
  element.id = id;
  if (required.toString().toLowerCase() === 'true') element.required = 'true';
  // element.form = "api-explorer-form";

  let error = document.createElement('p');
  error.id = 'error-'+id;
  error.classList.add('explorer-field-error-message');

  row.appendChild(label);
  row.appendChild(element);
  if(location === 'header') parentId = 'explorer-headers';
  else if(location === 'body') parentId = 'explorer-body';
  else parentId = 'explorer-parameters';
  document.getElementById(parentId).appendChild(row);
  document.getElementById(parentId).appendChild(error);
}

function buildParametersObject(parameters) {
  let json = {};
  for(let i=0;i<parameters.length;i++) {
    const key = parameters[i].name;
    const value = ('parameters' in parameters[i]) ? buildParametersObject(parameters[i]) : key;
    json[key] = value;
  }
  return json;
}

function createTextField(placeholder, className) {
  let input = document.createElement("input");
  input.type = "text";
  input.placeholder = placeholder;
  input.classList.add(className);
  return input;
}

function createSelect(values) {
  if(!values || values.length == 0) {
    console.error('API Explorer expected a list of values.');
    return;
  }

  let select = document.createElement("select");
  select.classList.add('explorer-select');
  for(let i=0;i<values.length; i++) {
    option = document.createElement('option');
    option.value = values[i].toLowerCase(); 
    option.innerHTML = values[i];
    select.appendChild(option);
  }

  return select;
}

function createCodeBlock(code, className) {
  let textarea = document.createElement("textarea");
  textarea.classList.add(className);
  //textarea.innerHTML = code; changed to placeholder
  textarea.placeholder = code;
  textarea.maxlength = 5000;
  return textarea;
}

function submitApiRequest(event) {
  event.preventDefault();
  const requestData = buildApiRequest();
  if(!requestData.valid) {
    return;
  }

  updateCodeBlock(requestData);
  delete requestData.valid; // Remove custom field from request
  callApi(token.trim(), requestData);
  displayIfActive('#request-code', 'explorer-code');
}

function buildApiRequest() {
  let requestData = { 'valid': true }; // Support parameters, headers, data (payload)
  const form = document.querySelector('#api-explorer-form');
  requestData.method = form.dataset.operation.toUpperCase();
  requestData.headers = {
    'accept': 'application/json',
    'x-Agent-Id': 'KEv7jzuWX2taiAtJjEGlynWq2cQMLSSoclients',
    'Authorization': "Bearer "+token
  };
  requestData.body = {}
  requestData.path = form.dataset.path;
  requestData.queryParams = [];
  processInputFieldType(requestData, 'input');
  processInputFieldType(requestData, 'select');
  processInputFieldType(requestData, 'textarea');
  if(requestData.valid && requestData.path.indexOf('{') > -1) {
    console.error('Unresolved field in path ['+requestData.path+']');
    requestData.valid = false;
  } else {
    //TODO: Put data-auth-type and data-baseurl on form element to differentiate between API services
    const requestUrl = "https://cloudmanager.cloud.netapp.com" + requestData.path + (requestData.queryParams.length > 0 ? "?"+requestData.queryParams.join('&') : '');
    requestData.url = requestUrl;
  }

  if(!requestData.body || Object.keys(requestData.body).length === 0) delete requestData.body;
  else {
    requestData.headers['Content-Type'] = 'application/json';
    requestData.body = JSON.stringify(requestData.body); // Fetch expects stringified json body. 
  }

  delete requestData.path;
  delete requestData.queryParams;
  return requestData;
}

function processInputFieldType(requestData, elementType) {
  $('#api-explorer-form '+elementType).each(function() {
    const name = $(this).attr('name');
    const id = $(this).attr('id');
    const inputValue = $(this).val().trim();
    const required = $(this).attr('required');
    const type = $(this).attr('data-type');
    const isValid = parameterValid(id, name, inputValue, required, type);
    if(requestData.valid) requestData.valid = isValid;
    if (inputValue === '') return; // Skip if no value provided.
    const location = $(this).attr('data-location').toLowerCase();
    if(location === 'path') {
      requestData.path = replacePath(requestData.path, name, inputValue);
    } else if(location === 'query') {
      let queryJson = {}
      queryJson[name] = inputValue; //Compliance for pre-ES6
      requestData.queryParams.push($.param(queryJson)); // Formats query param
    } else if(location === 'header') {
      requestData.headers[name] = inputValue;
    } else if(location === 'body') {
      requestData.body[name] = parseString(inputValue, type);
    } else {
      console.error('The parameter ['+name+'] of input ['+location+'] is not supported.');
      return;
    }
  });
}

// Converts string to an object, boolean, or string. 
function parseString(text) {
  const inputType = (typeof text);
  if(text.toLowerCase() === 'true') return true;
  else if(text.toLowerCase() === 'false') return false;
  try {
    return JSON.parse(text);
  } catch(e) {
    console.error("The JSON text was unable to be parsed. Likely a simple string.",e);
    return text;
  }
}

// Validate an input field
function parameterValid(id, name, value, required, type) {
    clearValidation(id);
    if (typeof required === 'undefined') return true; // Skip optional fields. 
    else if (value === '') {
      document.getElementById(id).classList.add('explorer-field-error');
      document.getElementById('error-'+id).innerHTML = 'Missing required value';
      return false; // Required field is empty.
    }

    // Basic check for object or array
    // TODO: Check each object field to ensure it matches format. 
    if(type.indexOf('array') > -1 || type.indexOf('object') > -1) {
      try {
        JSON.parse(value);
      } catch(e) {
        document.getElementById(id).classList.add('explorer-field-error');
        document.getElementById('error-'+id).innerHTML = 'Invalid format of '+(typeof value)+'. Expected '+type;
        return false; // Object or array is invalid.
      }
    }
    
    return true;
}

function clearValidation(id) {
  document.getElementById(id).classList.remove('explorer-field-error');
  document.getElementById('error-'+id).innerHTML = '';
}

// Custom replace function instead of regex
function replacePath(url, query, replace) {
  let segments = url.split("/");
  for(let i=0;i<segments.length;i++) {
    if(segments[i] === "{"+query+"}") {
      segments[i] = replace;
      break;
    }
  }
  return segments.join('/');
}

// Provides a curl example of the API request. Body is already stringified. 
function updateCodeBlock(requestData) {
  const url = requestData['url'];
  let curl = `curl -X ${requestData['method']} \"${url}\"`;
  for(let key in requestData.headers) {
    curl += ` -H  \"${key}: ${requestData.headers[key]}\"`; 
  }

  if(typeof requestData.body != "undefined" && !jQuery.isEmptyObject(requestData['body'])) {
    let requestBodyUnescaped = requestData['body'].split('},{').join('}, {').replace(/:/, ": ");
    let requestBodyEscaped = requestBodyUnescaped.replace(/\n/g, "\\n")
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"')
      .replace(/&/g, "\\&")
      .replace(/\r/g, "\\r")
      .replace(/\t/g, "\\t")
      .replace(/\f/g, "\\f");
    curl += ` -d \"${requestBodyEscaped}\"`;
  }
  
  $('#request-code').text(curl);
}

function openPanel() {
  let w = $(document).width()
  if(w < 500) {
    document.getElementById("sidePanel").style.width = "100%";
    // document.getElementById("sidePanel").style.height = (document.documentElement.clientHeight - $("#banner").height()) + "px";
  } else {
    document.getElementById("sidePanel").style.width = "30%";
    document.getElementById("sidePanel").style.minWidth = "500px";
    // document.getElementById("sidePanel").style.height = (document.documentElement.clientHeight - $("#banner").height()) + "px";
  }
}

function closePanel() {
  document.getElementById("sidePanel").style.width = 0;
  document.getElementById("sidePanel").style.minWidth = 0;
}