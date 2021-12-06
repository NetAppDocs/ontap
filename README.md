# ontap

# Working with ontap-internal
Instructions for making changes to ontap-internal as of 6 December 2021

## Hot Fix
If you are making hotfix changes:
1. Ensure that you have the most recent build of the repo. Run `git pull origin`.
2. Checkout the branch `ontap-9101rc1-hotfix`
3. Create a new branch based off of the 9.10.1 hotfix branch. The naming convention should be <your_ssn>-hotfix-<today's_date>:
    `git checkout -b <your branch name> ontap-9101rc1-hotfix`
    a. Only push when you need to validate changes. ontap-internal buids take up to 70 minutes. 
    b. If you are responding to a Github issue or BURT, please put the associated ID as the commit message, especially if the Github issue can be closed at the time of merging. If no comment is needed on the issue, the publisher can automate the closing of the GitHub issue to the merging of the branch. 
4. When you have validated your changes, send a message to the publisher who will manage the merge. 