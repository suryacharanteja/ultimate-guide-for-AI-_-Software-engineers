export const LAYERS = [
  { id: 'physical', name: 'Physical Layer', icon: '⚡', color: '#f59e0b', desc: 'Signals, bits, cabling' },
  { id: 'link', name: 'Data Link Layer', icon: '🔗', color: '#ef4444', desc: 'Ethernet, MAC, Frames' },
  { id: 'network', name: 'Network Layer', icon: '🌐', color: '#10b981', desc: 'IP, Routing, Packets' },
  { id: 'transport', name: 'Transport Layer', icon: '📦', color: '#6366f1', desc: 'TCP/UDP, Segments' },
  { id: 'application', name: 'Application Layer', icon: '🚀', color: '#a855f7', desc: 'HTTP, DNS, Payloads' }
];

export const LAYER_CONTENT = {
  application: {
    title: 'Application Layer (L7)',
    subtitle: 'Where user data meets the network stack.',
    description: 'Interface between software applications and the lower layers. Handles data formatting, encryption, and protocol-specific logic.',
    systemInteractions: {
      hardware: 'No direct hardware access at this layer. The CPU executes application code. GPU (Graphics Processing Unit) handles screen rendering; NIC (Network Interface Card) is reached only after data passes down through all lower layers.',
      ram: 'HTTP request/response data lives in user-space heap buffers (process memory). On send(), the kernel copies this data into kernel-space socket send buffers (sk_buff — socket buffer structures).',
      kernel: 'POSIX socket syscalls — socket(), connect(), send(), recv() — trigger a User Mode → Kernel Mode context switch via the syscall instruction (x86-64). The kernel\'s VFS (Virtual File System) and socket layer handle the transition.'
    },
    sim: {
      steps: [
        { from: 'browser', to: 'tls', msg: 'Initiating Secure Connection', detail: 'Browser prepares HTTP request headers.' }
      ]
    },
    hex: { title: 'HTTP Data', bytes: ['47','45','54','20','2F','20','48','54','54','50','2F','31','2E','31'], labels: ['G','E','T',' ','/',' ','H','T','T','P','/','1','.','1'] },
    fields: [
      { name: 'Method', value: 'GET', bits: 'ASCII' },
      { name: 'URI', value: '/', bits: 'ASCII' },
      { name: 'User-Agent', value: 'Mozilla/5.0', bits: 'ASCII' }
    ]
  },
  transport: {
    title: 'Transport Layer (L4)',
    subtitle: 'End-to-end logical communication and error correction.',
    description: 'Provides transparent transfer of data between end users. TCP ensures reliability via sequence numbers and ACKs, while UDP prioritizes speed.',
    systemInteractions: {
      hardware: 'TCP checksum computation is offloaded to the NIC (Network Interface Card) hardware on modern systems — the CPU sets a flag in the sk_buff and the NIC fills the checksum field before transmission, eliminating CPU cycles for this.',
      ram: 'Each TCP connection maintains send and receive buffers in kernel RAM: sk_sndbuf (send buffer) and sk_rcvbuf (receive buffer). Sizes are tuned via net.core.wmem_max / rmem_max sysctl (kernel runtime parameters). The TCB (Transmission Control Block) struct also lives in kernel RAM.',
      kernel: 'The kernel\'s TCP/IP stack manages the TCB (Transmission Control Block) per connection: FSM (Finite State Machine) state (SYN_SENT, ESTABLISHED, etc.), Sequence Numbers, CWND (Congestion Window), SSTHRESH (Slow-Start Threshold), and RTO (Retransmission Timeout) timers.'
    },
    sim: { steps: [] },
    hex: { title: 'TCP Header (key fields — full header is 20 bytes minimum)', bytes: ['C0','00','01','BB','00','00','03','E8','00','00','13','88','50','02','FF','FF','00','00','00','00'], labels: ['SrcPort','SrcPort','DstPort','DstPort','Seq','Seq','Seq','Seq','Ack','Ack','Ack','Ack','DataOff/Flags','Flags','WinSize','WinSize','Checksum','Checksum','UrgPtr','UrgPtr'] },
    fields: [
      { name: 'Source Port', value: '49152', bits: '16' },
      { name: 'Dest Port', value: '443', bits: '16' },
      { name: 'Seq Number', value: '1000', bits: '32' },
      { name: 'Window Size', value: '65535', bits: '16' }
    ]
  },
  network: {
    title: 'Network Layer (L3)',
    subtitle: 'Logical addressing and routing across subnets.',
    description: 'Determines the best physical path for the data. Handles IP addressing, ICMP errors, and fragmenting large packets to match MTU.',
    systemInteractions: {
      hardware: 'Routers use TCAM (Ternary Content-Addressable Memory) — a specialized hardware memory that performs LPM (Longest-Prefix Match) route lookups in a single clock cycle at wire speed, regardless of routing table size.',
      ram: 'The kernel stores the FIB (Forwarding Information Base) routing table in RAM. On Linux, the FIB is organized as a trie (prefix tree) for efficient LPM. Large internet routing tables (800k+ IPv4 prefixes) consume significant RAM in core routers.',
      kernel: 'The kernel IP forwarding path decrements TTL (Time To Live) and recomputes the header checksum at each router hop. It also handles ICMP (Internet Control Message Protocol) errors — e.g., "TTL Exceeded" sent back to sender when TTL reaches 0.'
    },
    sim: { steps: [] },
    hex: { title: 'IP Header', bytes: ['45','00','00','3C','1C','46','40','00','40','06','B1','E6'], labels: ['Ver/IHL','ToS','Len','Len','ID','ID','Flags','Offset','TTL','Proto','Check','Check'] },
    fields: [
      { name: 'Version', value: '4 (IPv4)', bits: '4' },
      { name: 'TTL', value: '64', bits: '8' },
      { name: 'Src IP', value: '192.168.1.10', bits: '32' },
      { name: 'Dst IP', value: '93.184.216.34', bits: '32' }
    ]
  },
  link: {
    title: 'Data Link Layer (L2)',
    subtitle: 'Point-to-point physical addressing (MAC).',
    description: 'Detects and corrects errors that may occur in the Physical Layer. Frames data with headers and trailers containing CRC (Cyclic Redundancy Check).',
    systemInteractions: {
      hardware: 'The NIC (Network Interface Card) handles CRC-32 FCS (Frame Check Sequence) generation on TX (transmit) and verification on RX (receive) entirely in hardware. It also offloads TCP/IP checksum computation, freeing CPU cycles.',
      ram: 'The NIC uses DMA (Direct Memory Access) to transfer frames between NIC hardware buffers and RAM ring buffers (RX ring / TX ring) without CPU involvement. The kernel pre-allocates sk_buff (socket buffer) descriptors in the ring that the NIC writes into directly.',
      kernel: 'On frame arrival, the NIC raises an IRQ (Interrupt Request). The kernel\'s top-half hard IRQ handler runs briefly, then schedules a softirq. The NAPI (New API) poll bottom-half batch-processes frames from the RX ring, strips the Ethernet header, and routes sk_buffs up the stack.'
    },
    sim: { steps: [] },
    hex: { title: 'Ethernet Frame (unicast data frame — after ARP resolves gateway MAC)', bytes: ['00','1A','2B','3C','4D','5E','AA','BB','CC','00','00','01','08','00'], labels: ['Dst MAC','Dst MAC','Dst MAC','Dst MAC','Dst MAC','Dst MAC','Src MAC','Src MAC','Src MAC','Src MAC','Src MAC','Src MAC','EtherType','EtherType'] },
    fields: [
      { name: 'Dst MAC', value: '00:1A:2B:3C:4D:5E (gateway unicast)', bits: '48' },
      { name: 'Src MAC', value: 'AA:BB:CC:00:00:01 (sender NIC)', bits: '48' },
      { name: 'EtherType', value: '0x0800 (IPv4)', bits: '16' }
    ]
  },
  physical: {
    title: 'Physical Layer (L1)',
    subtitle: 'Raw bitstream transmission over hardware.',
    description: 'Transmission and reception of unstructured raw data between a device and a physical medium. Translates bits into voltage, pulses, or waves.',
    systemInteractions: {
      hardware: 'The PHY (Physical Layer) chip on the NIC performs line encoding and decoding: PAM-5 for 1000BASE-T, PAM-16 for 10GBASE-T, PAM-4 for 25G/100G. SFP+ / QSFP28 transceiver modules convert electrical signals to optical pulses for fiber links. CDR (Clock and Data Recovery) circuits recover the clock from the incoming signal.',
      ram: 'The PHY chip contains small internal FIFO (First-In First-Out) bit buffers for serialization and deserialization (SerDes). Once a complete frame is assembled, the NIC\'s DMA (Direct Memory Access) engine copies it to the RX ring buffer in system RAM.',
      kernel: 'The kernel has minimal direct interaction with L1. The NIC driver configures the PHY via MDIO (Management Data Input/Output) bus registers — setting link speed, duplex, and auto-negotiation parameters. Beyond initial setup, L1 operates autonomously in hardware.'
    },
    sim: { steps: [] },
    hex: { title: 'Ethernet Preamble + SFD (Start Frame Delimiter) — 8 bytes before every frame', bytes: ['AA','AA','AA','AA','AA','AA','AA','AB'], labels: ['Pre','Pre','Pre','Pre','Pre','Pre','Pre','SFD'] },
    fields: [
      { name: 'Connector', value: 'RJ-45 (copper) / LC-LC (fiber)', bits: '-' },
      { name: 'Encoding', value: '1G→PAM-5 | 10G→PAM-16 | 25G/100G→PAM-4', bits: '-' },
      { name: 'Media', value: 'Cat6a UTP (copper) / SMF or MMF (fiber)', bits: '-' }
    ]
  }
};
