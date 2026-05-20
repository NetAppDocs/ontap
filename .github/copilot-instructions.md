# Copilot instructions for ONTAP software documentation

## Repository overview

Product: ONTAP

ONTAP software provides data management, security, and protection across various on-premises storage platforms, with management provided through a web-based UI, command line interface, and APIs. The documentation covers procedures required to install, use, and maintain the software across supported software versions.

## Repository structure

- `authentication-access-control/`, `cluster-admin/`, event-performance-monitoring/, get-started/, nas-management/, network-management/, object-storage-management/, san-management/, security-encryption/ setup-upgrade/, volume-admin/ - ONTAP content area landing pages
- `_include/` - Reusable ASCiiDoc procedural or conceptual content reused in multiple topics
- `anti-ransomware/` - Enable, use, and update autonomous ransomware protection
- `antivirus/` - Configure and manage antivirus protection, install and configure Vscan, configure and apply scanner pools, and configure scanning
- `authentication/`- Manage ONTAP cluster authentication and access control to ONATP web services including the use of certificates, RBAC, and SAML
- `concepts/` - Descriptions and explanations of ONTAP concepts including platforms, user interfaces, network and storage architecture, storage efficiency, and security
- `consistency-groups/`- Configure, protect, modify, clone, and delete ONTAP consistency groups
- `data-protection/` - Configure, use, and manage snapshots and SnapMirror relationships for data protection
- `disks-aggregates/`- Descriptions and explanations of the use of disks, local tiers, Flash Pool, RAID groups, and RAID types
- `element-replication/`- Redirects to the element-replication repo
- `encryption-at-rest/`- Configure and manage NetApp Volume Encryption (NVE), NetApp Aggregate Encryption (NAE), and NetApp hardware-based encryption
- `error-messages/`- Configure ONTAP to send important event management system (EMS) event notifications 
- `fabricpool/`- Configure and manage FabricPool to tier data depending upon how frequently the data is accessed
- `file-system-analytics/`- Collect and display data usage analytics and take corrective actions
- `flexcache/`- Create and manage flexcache volumes
- `flexcache-hot-spot/`- Remediate hotspotting with FlexCache
- `flexcache-writeback/`- Guidelines, architecture, use cases, prerequisites, interoperability and procedures to enable and manage FlexCache write-back
- `flexgroup/`- Set up, manage, protect, and convert Flexgroup volumes 
- `fpolicy/` - Sidebar for FPolicy configuration
- `high-availability/`- Understand and manage takeover and giveback operations between HA pairs
- `media/` - Image files reused across all folders in the repo
- `mediator/`- Install, upgrade, and manage ONTAP Mediator
- `multi-admin-verify/`- Enable, disable, and manage multi-admin verification including protected rules and operations
- `nas-audit/` - Configure and use NAS auditing
- `ndmp/`- Configure and manage Network Data Management Protocol (NDMP)
- `nfs-admin/` - Understand, configure, and manage NAS file access using the NFS protocol
- `nfs-config/`- Configure NFS client access to files
- `nfs-rdma/` - Configure NFS over RDMA
- `nfs-trunking/` - Configure and manage NFS servers and exports for trunking
- `nvme/` - Provision NVMe namespaces for SAN storage
- `peering/`- Create, use, and manage cluster peers relationships for data protection
- `performance-admin/`- Monitor and manage cluster performance
- `pnfs/`- Deployment, tuning, performance and commands for parallel NFS (pNFS)
- `redirect/`- File redirects
- `release-notes/` - New features, support, and limitations in supported ONTAP releases
- `revert/` - Revert ONTAP software to an earlier ONTAP version
- `s3-audit/` - Audit data and management events in ONTAP S3 environments
- `s3-config/` - Configure and manage S3 access to storage objects, protect s3 buckets with SnapMirror and snapshots, and audit S3 events 
- `s3-multiprotocol/`- Provide S3 client access to NAS data
- `s3-snapmirror/` - Protect buckets in ONTAP S3 with SnapMirror and backup
- `san-admin/` - Provision and manage LUNs for SAN storage
- `san-concepts/` - Basic SAN concepts
- `san-config/` - Configure SAN networks
- `san-data-protection/`- Understand data protection options specific to SAN environments
- `smb-admin/` - Set up and manage file access using SMB shares and servers
- `smb-config/` - Configure SMB
- `smb-hyper-v-sql/`- Configure SMB for Microsoft Hyper-V and SQL server
- `snaplock/`- Set up, use, and manage ONTAP SnapLock and WORM files to secure data
- `snapmirror-active-sync/`- Protect data with SnapMirror active sync
- `software_setup/` - Install the ONTAP software on a new storage system cluster
- `svm-migrate/`- Migrate data across storage virtual machines (SVMs)
- `system-admin/` - Manage and monitor ONTAP clusters and cluster resources
- `tape-backup/`- Backup and restore data to tape through the Network Data Management Protocol (NDMP) and manage tape drives
- `update/` - Update and manage firmware, system files, and security files on an ONTAP cluster
- `upgrade/` - Upgrade the ONTAP software
- `volumes/`- Create and manage ONTAP volumes and LUNs

## Product-specific content

- **AFF:** All Flash FAS — NetApp storage systems built entirely on flash (SSD) storage for high performance workloads.
- **AFX:** All Flash extreme — a specialized NetApp storage personality optimized for specific high-performance protocols.
- **ASA:** All-SAN Array — a NetApp storage system and personality optimized exclusively for SAN (block) workloads.
- **FAS:** Fabric-Attached Storage — NetApp hybrid or HDD-based storage systems, supporting a mix of flash and spinning disk.
- **FlexPod:** A converged infrastructure solution combining NetApp storage, Cisco networking, and Cisco UCS compute.
- **Node:** A single storage controller and its associated storage, network connectivity, and running ONTAP instance.
- **HA pair:** High Availability pair — two nodes configured to provide fault tolerance; if one fails, the partner takes over its storage.
- **Cluster:** A group of HA-paired nodes (up to 12 for SAN, up to 24 for NAS) sharing a common namespace and management plane.
- **Aggregate / Local Tier:** A collection of disks grouped into RAID groups, forming the physical storage container for volumes. In ONTAP 9.6 and earlier, System Manager uses the term aggregate to describe a local tier. In ONTAP 9.7 and later System Manager uses the term local tier  Regardless of your ONTAP version, the ONTAP CLI uses the term aggregate.
- **SVM:** Storage Virtual Machine — a logical entity that serves data to clients and hosts; it has its own namespace, security, and administration. Formerly called a "vserver."
- **LIF:** Logical interface — a virtual network port associated with an SVM; can migrate between physical ports during failover.
- **Volume / FlexVol:** A logical container for data within an aggregate, loosely coupled to allow flexible management, movement, and resizing.
- **FlexGroup volume:** A massively scalable volume supporting up to 400 billion files, composed of up to 200 constituent member volumes that balance load automatically.
- **FlexClone:** Technology that uses snapshot metadata to create instant, space-efficient, writable copies of volumes, files, or LUNs.
- **Qtree:** A partition within a FlexVol volume used to subdivide it into more manageable units and apply quotas.
- **LUN:** Logical Unit Number — a block storage object presented to SAN hosts as a virtual disk, stored inside an ONTAP volume.
- **Namespace:** The NVMe equivalent of a LUN — a block storage object used exclusively with the NVMe protocol.
- **WAFL:** Write Anywhere File Layout — ONTAP's core storage virtualization technology; writes new data to new blocks rather than overwriting existing ones, enabling efficient snapshots.
- **Snapshot:** A read-only, point-in-time image of a volume. Consumes minimal space by recording only changes since the last snapshot. Formerly called "Snapshot copy."
- **Snapshot Policy:** A configuration defining when snapshots are created, how many are retained, and how they are labeled.
- **Deduplication:** A storage efficiency process that identifies and eliminates duplicate data blocks, replacing them with pointers to a single shared block.
- **Compression:** A storage efficiency process that combines data blocks into compression groups stored as single blocks, reducing physical space consumption.
- **Inline Compression:** Compression performed in memory before data is written to disk.
- **Postprocess Compression:** Compression performed after data is written to disk, typically on the same schedule as deduplication.
- **Inline Data Compaction: Packs small files or zero-padded I/O into a single 4 KB block to eliminate wasted space.
- **TSSE:** Temperature-Sensitive Storage Efficiency — a method of triggering compression based on whether data is "hot" (recently accessed) or "cold" (infrequently accessed).
- **Thin Provisioning:** Allocating storage dynamically as data is written, rather than reserving the full amount upfront, allowing "overcommitment" of physical capacity.
- **FabricPool:** An ONTAP feature that automatically moves "cold" (infrequently accessed) data from expensive local flash storage to lower-cost cloud or object storage tiers.
- **SnapMirror:** ONTAP disaster recovery replication technology that mirrors volumes from a primary site to a secondary site. Can also be used for data transfer between endpoints.
- **SnapVault:** ONTAP archiving technology for disk-to-disk snapshot replication, designed for long-term retention and compliance. (SnapVault licenses deprecated since ONTAP 9.3; now covered by the SnapMirror license.)
- **SnapMirror Active Sync:** A SnapMirror capability that provides zero RPO and zero RTO for SAN workloads using synchronous replication between clusters. (Formerly "SnapMirror Business Continuity" / SM-BC.)
- **SnapMirror Cloud:** Extension of SnapMirror that replicates ONTAP snapshots to S3-compatible object storage for cloud-based backup and archiving.
- **SnapLock:** A compliance solution that enforces WORM storage — data written to SnapLock volumes cannot be modified or deleted before a retention period expires.
- **SyncMirror:** An ONTAP feature that synchronously mirrors aggregate data into two copies (plexes), used internally by MetroCluster and optionally in standalone HA deployments.
- **MetroCluster:** A configuration in which two physically separated, mirrored ONTAP clusters synchronously replicate data and SVM configuration for continuous availability across sites.
- **Plex:** One of two mirrored copies of aggregate data in a SyncMirror or MetroCluster configuration.
- **Consistency Group:** A collection of volumes managed as a single unit for snapshot and data protection operations, ensuring write-order consistency across volumes.
- **IPspace:** A distinct IP address space within ONTAP, used to separate network domains (e.g., for multitenancy).
- **Broadcast Domain:** A grouping of network ports that share the same layer 2 (Ethernet) network segment; used to define LIF failover groups.
- **Subnet:** A reserved block of IP addresses within a broadcast domain, used to simplify LIF address assignment.
- **VLAN:** Virtual Local Area Network — a logical segmentation of a physical network used to isolate traffic by department, tenant, or protocol type.
- **RDMA:** Remote Direct Memory Access — a technology that allows data to be transferred directly between storage and host memory, bypassing CPU overhead and reducing latency.
- **RoCE:** RDMA over Converged Ethernet — a protocol enabling RDMA capabilities over standard Ethernet networks.
- **Cluster Interconnect:** A private, dedicated network used by ONTAP nodes in a cluster to communicate with each other and mirror NVRAM data.
- **Failover Group:** A set of network ports to which a LIF can migrate during a link failure.
- **MPIO:** Multipath I/O — a host-side technology that provides multiple paths between initiators and storage targets for redundancy and load balancing.
- **ALUA:** Asymmetric Logical Unit Access — a SAN standard that identifies optimized vs. non-optimized paths to a LUN, used by hosts for intelligent path selection.
- **SLM:** Selective LUN Map — an ONTAP feature that limits the number of paths from a SAN host to a LUN to only the owning node and its HA partner.
- **Port Set:** A named set of LIFs used to restrict SAN initiator access to specific network interfaces.
- **FPolicy:** File Policy — an ONTAP framework that intercepts file access events and notifies external servers, enabling use cases such as security scanning, auditing, and data governance.
- **Vscan:** ONTAP's virus scanning feature, which offloads antivirus scanning to external servers using the ONTAP Antivirus Connector.
- **NSE:** NetApp Storage Encryption — a hardware-based encryption solution using Self-Encrypting Drives (SEDs).
- **NVE:** NetApp Volume Encryption — software-based encryption that encrypts data at the volume level using a unique XTS-AES-256 key per volume.
- **NAE:** NetApp Aggregate Encryption — software-based encryption at the aggregate level, using unique keys per aggregate; allows cross-volume deduplication, unlike NVE.
- **Multi-Admin Verify (MAV):** A feature requiring approval from multiple administrators before sensitive operations (such as deleting snapshots or disabling security features) can be executed.
- **ARP: Autonomous Ransomware Protection** — an ONTAP feature that uses machine learning to detect abnormal activity indicative of a ransomware attack and creates a snapshot for recovery.
- **QoS:** Quality of Service — ONTAP policies that control throughput (in IOPS or MB/s) for storage workloads to protect critical applications from competing workloads.
- **QoS Max (Ceiling):** A QoS setting that caps the maximum throughput a workload can consume.
- **QoS Min (Floor):** A QoS setting that guarantees a workload a minimum throughput level regardless of competing demand.
- **Adaptive QoS:** A QoS policy that automatically scales throughput ceilings or floors relative to the workload's size (allocated or used space).
- **System Manager:** ONTAP's built-in browser-based GUI for cluster administration.
- **CLI:** Command-Line Interface — ONTAP's text-based management interface accessed via SSH or the serial console.
- **AutoSupport:** An ONTAP subsystem that automatically collects and transmits system telemetry, logs, and health data to NetApp for proactive support.
- **Digital Advisor:** NetApp's AI-driven monitoring and analytics portal (formerly Active IQ) that analyzes AutoSupport data to provide upgrade recommendations, wellness alerts, and performance insights.
- **EMS:** Event Management System — ONTAP's internal framework for generating and forwarding system events and alerts.
- **SnapCenter:** NetApp's data protection application for host-consistent backup and recovery, with integrations for databases, virtual machines, and file systems.
- **SupportEdge:** NetApp's support contract tier that governs access to Digital Advisor features and proactive support services.
- **Config Advisor:** A NetApp validation tool that checks cluster configuration against best practices prior to and after setup or upgrades.
- **Peering:** The establishment of a trusted relationship between two ONTAP clusters (cluster peering) or two SVMs (SVM peering) to enable data replication and other cross-cluster operations.
- **SnapRestore:** An ONTAP feature that restores a volume, file, or LUN from a snapshot rapidly and nondisruptively.
- **Takeover:** The process by which an HA partner assumes control of a failed node's storage and continues serving data.
- **Giveback:** The process of returning storage to a recovered node after it comes back online following a takeover.
- **NDU:** Nondisruptive Upgrade — the ability to upgrade ONTAP software without interrupting data access to clients and hosts.
- **Switchover / Switchback:** MetroCluster operations in which one site assumes the workload of the other (switchover during a disaster; switchback when the primary site recovers).
- **Load-Sharing Mirror:** A special read-only mirror of an SVM root volume used to distribute NAS namespace traversal load across nodes.

## Typical user workflows

- **Software installation:** Install ONTAP software on a new cluster
- **Software upgrade:** Prepare and execute an ONTAP software upgrade using the automated upgrade process or the manual process.
- **Provision storage:** Make data available to various hosts and clients across various NAS and SAN protocols
- **Protect data:** Create and and snapshot copies, mirrors, vaults, and use SnapMirror technology for disaster recovery. 
- **Secure data:** Secure client and administrator access to storage and protect against viruses.
- **Monitor storage and performance:** Monitor storage capacity and performance.