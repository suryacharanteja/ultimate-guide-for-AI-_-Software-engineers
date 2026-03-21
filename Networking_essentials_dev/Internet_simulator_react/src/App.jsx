import React, { useState, useRef, useCallback, useEffect } from 'react';
import { LAYERS, LAYER_CONTENT } from './data';
import { 
  Network, Zap, Link as LinkIcon, Globe, Package, Rocket, 
  Activity, ArrowRight, ArrowLeft, RotateCcw, Play, Pause, 
  Layers, ArrowDown, ArrowUp, Cpu, Monitor, CheckCircle2
} from 'lucide-react';

const icons = {
  application: <Rocket size={18} />,
  transport: <Package size={18} />,
  network: <Globe size={18} />,
  link: <LinkIcon size={18} />,
  physical: <Zap size={18} />
};

const FULL_STACK_STEPS = [
  // ═══════════════════════════════════════════════
  //  PHASE 1: REQUEST  (Client → Server)
  // ═══════════════════════════════════════════════
  { phase: 'REQUEST', side: 'sender', layer: 'application', 
    msg: 'L7 — Browser generates HTTP GET /index.html',
    detail: 'The browser process (User Space) serializes the HTTP request into a byte buffer in the process\'s heap memory (RAM). It then calls the POSIX socket API: send(fd, buffer, len, 0). On x86-64 Linux this triggers a User Mode → Kernel Mode context switch via the syscall instruction (not int 0x80, which is the legacy 32-bit path). The CPU saves registers, switches the stack pointer to the kernel stack, and enters the kernel\'s socket send path.',
    headers: ['HTTP Payload'] },

  { phase: 'REQUEST', side: 'sender', layer: 'transport', 
    msg: 'L4 — TCP wraps with Src Port 49152, Dst Port 443',
    detail: 'The kernel TCP (Transmission Control Protocol) stack copies the payload from user-space into the kernel socket send buffer (sk_buff — socket buffer — in Linux). It prepends a 20-byte TCP header containing: Src Port (ephemeral 49152), Dst Port (443/HTTPS), Sequence Number (tracks byte position in stream), Window Size (advertised receive buffer space). The TCB (Transmission Control Block) struct in kernel RAM tracks per-connection state: retransmission timers, CWND (Congestion Window), SSTHRESH (Slow-Start Threshold), and the FSM (Finite State Machine) state.',
    headers: ['TCP Hdr', 'HTTP Payload'] },

  { phase: 'REQUEST', side: 'sender', layer: 'network', 
    msg: 'L3 — IP adds Src 192.168.1.10 → Dst 93.184.216.34',
    detail: 'The kernel IP (Internet Protocol) layer prepends a 20-byte IPv4 header. It consults the FIB (Forwarding Information Base) routing table in kernel memory to determine the next-hop gateway. TTL (Time To Live) is set to 64 — decremented by 1 at each router hop; packet is dropped when it reaches 0. A header checksum is computed by the CPU over the IP header only (not payload). If the total packet size exceeds the link MTU (Maximum Transmission Unit, typically 1500 bytes for Ethernet), the kernel fragments it, setting the MF (More Fragments) flag on all but the last fragment, and the Fragment Offset field on each.',
    headers: ['IP Hdr', 'TCP Hdr', 'HTTP Payload'] },

  { phase: 'REQUEST', side: 'sender', layer: 'link', 
    msg: 'L2 — Ethernet adds MAC src/dst & CRC-32 trailer',
    detail: 'The kernel ARP (Address Resolution Protocol) cache — a hash table in RAM — is checked for the gateway\'s MAC (Media Access Control) address. If absent, an ARP broadcast (Dst MAC FF:FF:FF:FF:FF:FF) is sent first to resolve the MAC; the reply is cached for future frames. For the actual data frame, a 14-byte Ethernet II header is prepended: Dst MAC (gateway unicast, e.g. 00:1A:2B:3C:4D:5E), Src MAC (sender NIC), EtherType 0x0800 (IPv4). A 4-byte CRC-32 FCS (Frame Check Sequence) trailer is appended for error detection. The complete frame is placed into the NIC\'s TX ring buffer — a circular DMA (Direct Memory Access) buffer shared between kernel memory and NIC hardware.',
    headers: ['ETH Hdr', 'IP Hdr', 'TCP Hdr', 'HTTP Payload', 'CRC'] },

  { phase: 'REQUEST', side: 'sender', layer: 'physical', 
    msg: 'L1 — NIC encodes frame into electrical signals',
    detail: 'The NIC\'s DMA (Direct Memory Access) engine reads the frame directly from the TX ring buffer in RAM without CPU involvement. The PHY (Physical Layer) transceiver chip encodes bits using a line coding scheme suited to the link speed: PAM-5 (Pulse Amplitude Modulation, 5 levels) for 1000BASE-T, PAM-16 (16 levels) for 10GBASE-T copper, or PAM-4 for 25G/100G fiber. An 8-byte physical preamble is prepended: 7 bytes of 0xAA (10101010 binary, for receiver clock sync) followed by 1 byte SFD (Start Frame Delimiter, 0xAB = 10101011) marking the start of the frame.',
    headers: ['⚡ Electrical Signals'] },

  { phase: 'REQUEST', side: 'wire', layer: 'physical', 
    msg: '⚡ REQUEST signals propagating across the network...',
    detail: 'Electrical or optical signals travel through switches, routers, and potentially undersea fiber cables. At each router hop: the IP TTL (Time To Live) is decremented by 1, a new L2 (Data Link layer) frame is constructed for the next link segment with updated MAC addresses, and the FIB (Forwarding Information Base) routing table is consulted for the next hop. Optical amplifiers (EDFAs — Erbium-Doped Fiber Amplifiers) compensate for signal attenuation over long fiber runs.',
    headers: ['⚡ On Wire →'] },

  { phase: 'REQUEST', side: 'receiver', layer: 'physical', 
    msg: 'L1 — Server NIC receives electrical signals',
    detail: 'The server NIC\'s PHY (Physical Layer) chip locks onto the incoming signal using a CDR (Clock and Data Recovery) PLL (Phase-Locked Loop) circuit to extract the clock and data bits. The preamble (0xAA × 7 bytes) and SFD (0xAB) are consumed; recovered frame bits are assembled in the NIC\'s internal FIFO (First-In First-Out) buffer. The NIC\'s DMA (Direct Memory Access) engine then copies the complete frame directly into a pre-allocated sk_buff (socket buffer) in the kernel\'s RX ring buffer in RAM, bypassing the CPU for the data transfer.',
    headers: ['Raw Frame Bits'] },

  { phase: 'REQUEST', side: 'receiver', layer: 'link', 
    msg: 'L2 — Verify CRC, strip Ethernet header ✓',
    detail: 'The NIC hardware computes the CRC-32 (Cyclic Redundancy Check, 32-bit) of the received frame and compares it against the FCS (Frame Check Sequence) trailer. A mismatch means bit errors occurred — the frame is silently dropped. If valid, the NIC raises a hardware IRQ (Interrupt Request) line to notify the CPU. The kernel\'s interrupt handler top-half (hard IRQ) runs briefly, then schedules a softirq / NAPI (New API) poll bottom-half, which batch-processes frames from the RX ring buffer: strips the 14-byte Ethernet II header, inspects EtherType (0x0800 = IPv4), and passes the sk_buff up to the network layer.',
    headers: ['IP Hdr', 'TCP Hdr', 'HTTP Payload'] },

  { phase: 'REQUEST', side: 'receiver', layer: 'network', 
    msg: 'L3 — Verify IP checksum, check destination ✓',
    detail: 'The kernel verifies the IP (Internet Protocol) header checksum — computed over the header only. If the destination IP matches a local interface address, the packet is consumed locally (not forwarded). TTL (Time To Live) would only be decremented if the packet were being forwarded, not here. The IP header is stripped by advancing the sk_buff (socket buffer) data pointer — zero-copy: no data movement, only the pointer offset changes. The Protocol field value 6 (= TCP) routes the payload to the kernel\'s TCP handler.',
    headers: ['TCP Hdr', 'HTTP Payload'] },

  { phase: 'REQUEST', side: 'receiver', layer: 'transport', 
    msg: 'L4 — TCP validates seq#, copies to socket recv buffer ✓',
    detail: 'The kernel TCP (Transmission Control Protocol) stack looks up the connection using a hash table keyed on the 4-tuple (SrcIP, SrcPort, DstIP, DstPort), finding the matching TCB (Transmission Control Block). The Sequence Number is validated to fall within the advertised receive window. If valid, the payload bytes are appended to the socket receive buffer (sk_rcvbuf) in kernel RAM. A delayed ACK (Acknowledgment) is scheduled — not sent immediately, allowing the server to piggyback the ACK on response data. The receive buffer size is tunable via the net.core.rmem_max sysctl (kernel runtime parameter).',
    headers: ['HTTP Payload'] },

  { phase: 'REQUEST', side: 'receiver', layer: 'application', 
    msg: 'L7 — Server app reads HTTP request from socket ✓',
    detail: 'The web server process (e.g., Nginx) uses non-blocking I/O: its worker was suspended in epoll_wait() (Linux) / kqueue (BSD/macOS), a syscall that yields the CPU until one or more file descriptors become readable. The kernel adds the socket fd (file descriptor) to the ready list and wakes the Nginx worker. Nginx then calls recv(fd, buf, len, 0) which immediately returns with data — it does not block. The kernel copies bytes from the socket receive buffer (kernel space) into the application\'s user-space buffer — another context switch via the syscall instruction. The HTTP (HyperText Transfer Protocol) parser in user space processes the request line ("GET / HTTP/1.1") and headers.',
    headers: ['✅ REQUEST Delivered'] },

  // ═══════════════════════════════════════════════
  //  PHASE 2: RESPONSE  (Server → Client)
  // ═══════════════════════════════════════════════
  { phase: 'RESPONSE', side: 'receiver', layer: 'application', 
    msg: 'L7 — Server generates HTTP 200 OK + HTML body',
    detail: 'The Nginx worker process reads /index.html from the kernel page cache (RAM-backed file cache) via mmap() — if the file is already cached, no disk I/O occurs. It constructs an HTTP (HyperText Transfer Protocol) response: "HTTP/1.1 200 OK\\r\\nContent-Type: text/html\\r\\n\\r\\n...". For small responses, send(fd, response_buf, len, 0) copies data through user-space → kernel socket buffer (two copies total). For large static files, sendfile() performs a zero-copy transfer: data moves directly from the page cache to the NIC via the kernel, never entering user-space.',
    headers: ['HTTP Response'] },

  { phase: 'RESPONSE', side: 'receiver', layer: 'transport', 
    msg: 'L4 — TCP segments the response, sets ACK flag',
    detail: 'The kernel TCP (Transmission Control Protocol) stack copies the response into the socket send buffer (sk_sndbuf). TCP segments the data at MSS (Maximum Segment Size). For plain HTTP over Ethernet, MSS = MTU(1500) − IP header(20) − TCP header(20) = 1460 bytes. For HTTPS with TLS (Transport Layer Security), TLS record overhead (~21 bytes for header + AEAD MAC) further reduces effective payload per segment to ~1439 bytes. Each segment gets a TCP header with: Sequence Number, ACK number (Acknowledgment — piggybacked ACK for the client\'s request), PSH (Push) flag instructing the receiver to deliver to the application immediately, and the current receive Window Size. Nagle\'s algorithm coalesces small writes to avoid many tiny segments.',
    headers: ['TCP Hdr', 'HTTP Response'] },

  { phase: 'RESPONSE', side: 'receiver', layer: 'network', 
    msg: 'L3 — IP adds Src 93.184.216.34 → Dst 192.168.1.10',
    detail: 'The IP (Internet Protocol) addresses are reversed: Source = server (93.184.216.34), Destination = client (192.168.1.10). The kernel consults its routing table (FIB — Forwarding Information Base) to select the outbound interface and next-hop. TTL (Time To Live) is set to 64. The IP ID (Identification) field is incremented per datagram — used by the receiver\'s fragment reassembly queue to group fragments belonging to the same original packet. The 16-bit header checksum is recalculated over the new header.',
    headers: ['IP Hdr', 'TCP Hdr', 'HTTP Response'] },

  { phase: 'RESPONSE', side: 'receiver', layer: 'link', 
    msg: 'L2 — Ethernet frame with server\'s MAC as source',
    detail: 'The server NIC\'s (Network Interface Card) MAC (Media Access Control) address becomes the Ethernet source. The upstream gateway\'s MAC (resolved via ARP — Address Resolution Protocol — cache) is the destination. A new CRC-32 FCS (Frame Check Sequence) is computed over the entire frame and appended as a 4-byte trailer. The frame descriptor is written to the NIC\'s TX ring buffer via DMA (Direct Memory Access). The kernel writes to the NIC\'s MMIO (Memory-Mapped I/O) doorbell register — a single 32-bit write that signals the NIC hardware "new descriptors are ready to transmit".',
    headers: ['ETH Hdr', 'IP Hdr', 'TCP Hdr', 'HTTP Response', 'CRC'] },

  { phase: 'RESPONSE', side: 'receiver', layer: 'physical', 
    msg: 'L1 — Server NIC transmits response signals',
    detail: 'The server NIC\'s DMA (Direct Memory Access) engine reads the frame from RAM and feeds it to the PHY (Physical Layer) chip. The PHY encodes bits using the link-speed negotiated scheme: PAM-16 (Pulse Amplitude Modulation, 16 levels) for 10GBASE-T copper, or PAM-4 (4 levels) for 25G/100G fiber links. For fiber uplinks, SFP+ (Small Form-factor Pluggable, 10G) or QSFP28 (Quad SFP, 100G) transceiver modules convert electrical signals to laser light pulses — typically 850nm (short-range multimode fiber, MMF) or 1310nm/1550nm (long-range single-mode fiber, SMF). The frame propagates out through the server\'s uplink toward the ToR (Top-of-Rack) switch.',
    headers: ['⚡ Electrical Signals'] },

  { phase: 'RESPONSE', side: 'wire', layer: 'physical', 
    msg: '⚡ RESPONSE signals propagating back to client...',
    detail: 'The response traverses the reverse path through backbone routers and ISP (Internet Service Provider) infrastructure. Each router performs a forwarding table lookup using LPM (Longest-Prefix Match) in TCAM (Ternary Content-Addressable Memory) hardware — a wire-speed lookup returning the next-hop in a single clock cycle. TTL (Time To Live) is decremented by 1 per hop. The L2 (Data Link layer) MAC (Media Access Control) header is rewritten for each new link segment. At the client\'s edge, the NAT (Network Address Translation) router on the home/office gateway translates the destination IP from the client\'s public IP back to the private address (e.g., 192.168.1.10) — NAT happens only at the network edge, not in backbone routers.',
    headers: ['⚡ ← On Wire'] },

  { phase: 'RESPONSE', side: 'sender', layer: 'physical', 
    msg: 'L1 — Client NIC receives response signals',
    detail: 'The client NIC\'s PHY (Physical Layer) chip locks onto the incoming signal\'s clock using a CDR (Clock and Data Recovery) circuit. Bits are recovered and assembled into a complete Ethernet frame in the NIC\'s internal RX FIFO (First-In First-Out) buffer. The DMA (Direct Memory Access) engine transfers the frame into a pre-allocated sk_buff (socket buffer) in the kernel\'s RX ring buffer in RAM. The NIC raises an MSI-X (Message Signaled Interrupts — Extended) interrupt, which is delivered to a specific CPU core — MSI-X allows per-queue interrupt affinity, avoiding CPU contention on multi-queue NICs.',
    headers: ['Raw Frame Bits'] },

  { phase: 'RESPONSE', side: 'sender', layer: 'link', 
    msg: 'L2 — Client verifies CRC, strips Ethernet ✓',
    detail: 'The NIC verifies CRC-32 (Cyclic Redundancy Check) in hardware via checksum offload — the CPU is not involved. The kernel network driver\'s NAPI (New API) handler polls the RX ring buffer in batch, processing multiple frames per interrupt to reduce interrupt overhead. The 14-byte Ethernet II header is stripped, EtherType 0x0800 (IPv4) confirmed. The sk_buff (socket buffer) is passed up to the IP layer. GRO (Generic Receive Offload) on modern NICs coalesces multiple TCP segments belonging to the same flow into a single larger sk_buff before passing to the stack, reducing per-packet CPU overhead.',
    headers: ['IP Hdr', 'TCP Hdr', 'HTTP Response'] },

  { phase: 'RESPONSE', side: 'sender', layer: 'network', 
    msg: 'L3 — Client verifies it\'s the intended recipient ✓',
    detail: 'The kernel verifies the destination IP matches a local interface address. The IP (Internet Protocol) header checksum is verified — modern NICs with checksum offload flag this in the sk_buff (socket buffer) metadata so the kernel skips the software recomputation. The Protocol field value 6 routes the payload to the TCP handler. If IP fragmentation occurred (packet exceeded MTU — Maximum Transmission Unit — at some hop), the kernel\'s fragment reassembly queue — a hash table in RAM keyed on (SrcIP, DstIP, Protocol, IP-ID) with a timeout timer — holds fragments until all arrive, then reassembles before passing up.',
    headers: ['TCP Hdr', 'HTTP Response'] },

  { phase: 'RESPONSE', side: 'sender', layer: 'transport', 
    msg: 'L4 — TCP validates, ACKs, copies to recv buffer ✓',
    detail: 'The kernel TCP (Transmission Control Protocol) stack matches the incoming segment to its TCB (Transmission Control Block) via the 4-tuple (SrcIP, SrcPort, DstIP, DstPort) hash. The Sequence Number is validated to fall within the advertised receive window — out-of-window segments are dropped. In-order payload bytes are appended to the socket receive buffer (sk_rcvbuf) in kernel RAM. The kernel schedules a delayed ACK (Acknowledgment): Linux default is 40ms (TCP_DELACK_MIN/MAX), Windows default is 200ms — per RFC 1122, the delay must not exceed 500ms. If a second segment arrives before the timer fires, an immediate ACK is sent. The application process is woken when epoll_wait() returns, indicating the socket fd is readable.',
    headers: ['HTTP Response'] },

  { phase: 'RESPONSE', side: 'sender', layer: 'application', 
    msg: 'L7 — Browser receives HTTP 200 OK + renders page 🎉',
    detail: 'The browser process\'s epoll_wait() returns indicating the socket fd (file descriptor) is readable. It calls recv() which performs a kernel → user-space copy (context switch via syscall instruction) — moving response bytes from the kernel socket receive buffer into the application\'s user-space buffer. The HTTP (HyperText Transfer Protocol) parser reads the status line ("HTTP/1.1 200 OK"), then response headers (Content-Type, Content-Length, etc.). The HTML body is passed to the rendering engine (Blink in Chrome, Gecko in Firefox): it parses HTML into the DOM (Document Object Model) tree, loads and applies CSS (Cascading Style Sheets), performs layout, and issues GPU (Graphics Processing Unit) draw calls via the compositor thread to paint pixels to the screen.',
    headers: ['✅ RESPONSE Delivered — Round Trip Complete!'] },
];


export default function App() {
  const [viewMode, setViewMode] = useState('full-stack');
  const [currentLayerId, setCurrentLayerId] = useState('application');
  const [simStep, setSimStep] = useState(0);
  const [eventLogs, setEventLogs] = useState([]);
  const [activeStackSide, setActiveStackSide] = useState(null);
  const [activeStackLayer, setActiveStackLayer] = useState(null);
  const [encapData, setEncapData] = useState([]);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const autoRef = useRef(null);
  const stepRef = useRef(0);

  const addLog = useCallback((type, msg, color = 'var(--primary)') => {
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setEventLogs(prev => [{ time, type, msg, color }, ...prev].slice(0, 50));
  }, []);

  const applyStep = useCallback((index) => {
    if (index >= FULL_STACK_STEPS.length) {
      setIsAutoPlay(false);
      clearInterval(autoRef.current);
      return;
    }
    const step = FULL_STACK_STEPS[index];
    setActiveStackSide(step.side);
    setActiveStackLayer(step.layer);
    setEncapData(step.headers);

    let color = 'var(--primary)';
    if (step.side === 'wire') color = 'var(--warning)';
    if (step.side === 'receiver') color = 'var(--success)';
    addLog(step.side.toUpperCase(), step.msg, color);

    const next = index + 1;
    setSimStep(next);
    stepRef.current = next;
  }, [addLog]);

  const resetSim = useCallback(() => {
    clearInterval(autoRef.current);
    setSimStep(0);
    stepRef.current = 0;
    setIsAutoPlay(false);
    setEncapData([]);
    setActiveStackSide(null);
    setActiveStackLayer(null);
    setEventLogs([]);
  }, []);

  const handleNext = useCallback(() => {
    applyStep(stepRef.current);
  }, [applyStep]);

  const handlePrev = useCallback(() => {
    const target = stepRef.current - 2;
    if (target < 0) {
      resetSim();
    } else {
      applyStep(target);
    }
  }, [applyStep, resetSim]);

  const handleAutoPlay = useCallback(() => {
    if (isAutoPlay) {
      clearInterval(autoRef.current);
      setIsAutoPlay(false);
      return;
    }
    setIsAutoPlay(true);
    // Run first step immediately
    applyStep(stepRef.current);
    autoRef.current = setInterval(() => {
      if (stepRef.current >= FULL_STACK_STEPS.length) {
        clearInterval(autoRef.current);
        setIsAutoPlay(false);
        return;
      }
      applyStep(stepRef.current);
    }, 1800);
  }, [isAutoPlay, applyStep]);

  useEffect(() => {
    return () => clearInterval(autoRef.current);
  }, []);

  const renderStack = (side) => {
    const sortedLayers = [...LAYERS].reverse();
    return (
      <div className={`stack ${activeStackSide === side ? 'active' : ''}`}>
        <div className="stack-header">
          <div className="stack-icon">{side === 'sender' ? <Monitor size={24} /> : <Cpu size={24} />}</div>
          <div style={{ flex: 1 }}>
            <div className="stack-label">{side === 'sender' ? 'SENDER' : 'RECEIVER'}</div>
            <div style={{ fontSize: 10, color: 'var(--text-dim)' }}>{side === 'sender' ? 'Client Device' : 'Cloud Server'}</div>
          </div>
          {side === 'receiver' && simStep === FULL_STACK_STEPS.length && <CheckCircle2 size={16} color="var(--success)" />}
        </div>

        {sortedLayers.map(layer => {
          const isActive = activeStackSide === side && activeStackLayer === layer.id;
          const idxInFlow = FULL_STACK_STEPS.findIndex(s => s.side === side && s.layer === layer.id);
          const isProcessed = idxInFlow !== -1 && idxInFlow < simStep;

          return (
            <div
              key={layer.id}
              className={`stack-layer ${isActive ? 'active' : ''} ${isProcessed && !isActive ? 'completed' : ''}`}
              style={{ '--layer-color': layer.color }}
              onClick={() => { setCurrentLayerId(layer.id); setViewMode('layer-deep'); }}
            >
              <div className="layer-dot"></div>
              <div className="layer-info">
                <span className="layer-name">{layer.name}</span>
                <span className="layer-short">{layer.desc}</span>
              </div>
              {isActive && (side === 'sender' ? <ArrowDown size={14} className="stack-arrow" /> : <ArrowUp size={14} className="stack-arrow" />)}
            </div>
          );
        })}
      </div>
    );
  };

  const finished = simStep >= FULL_STACK_STEPS.length;

  return (
    <div className="app-container">
      {/* ——— HEADER ——— */}
      <header>
        <div className="logo" onClick={resetSim} style={{ cursor: 'pointer' }}>
          <Network size={28} />
          <span>NETOS <span style={{ fontWeight: 300, color: 'var(--text-dim)' }}>| Simulator</span></span>
        </div>

        <div className="mode-toggle">
          <button className={`mode-btn ${viewMode === 'full-stack' ? 'active' : ''}`} onClick={() => setViewMode('full-stack')}>
            <Layers size={14} /> Full Journey
          </button>
          <button className={`mode-btn ${viewMode === 'layer-deep' ? 'active' : ''}`} onClick={() => setViewMode('layer-deep')}>
            <Activity size={14} /> Protocol Inspector
          </button>
        </div>

        <div style={{ marginLeft: 'auto', display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 10, color: 'var(--text-dim)', letterSpacing: 1 }}>FLOW</div>
            <div style={{ fontSize: 14, fontWeight: 800 }}>{simStep} / {FULL_STACK_STEPS.length}</div>
          </div>
          <div className="progress-bar-container">
            <div className="progress-bar-fill" style={{ width: `${(simStep / FULL_STACK_STEPS.length) * 100}%` }}></div>
          </div>
        </div>
      </header>

      {/* ——— SIDEBAR ——— */}
      <div className="sidebar">
        <div className="sidebar-section">
          <div className="section-title">PACKET STATE</div>
          <div className="packet-inspector">
            {encapData.length === 0 ? (
              <div className="empty-state">Press ▶ to begin</div>
            ) : (
              <div className="packet-visualizer">
                {encapData.map((header, i) => (
                  <div key={i} className="packet-chunk" style={{ animationDelay: `${i * 0.1}s` }}>{header}</div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="sidebar-section" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div className="section-title">EVENT LOG</div>
          <div className="log-scroll">
            {eventLogs.length === 0 && <div className="empty-state" style={{ paddingTop: 40 }}>Events appear here</div>}
            {eventLogs.map((log, i) => (
              <div key={i} className="log-card" style={{ borderLeft: `3px solid ${log.color}` }}>
                <div className="log-meta">
                  <span style={{ color: log.color }}>{log.type}</span>
                  <span>{log.time}</span>
                </div>
                <div className="log-content">{log.msg}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ——— MAIN CONTENT ——— */}
      <div className="main-content">
        {viewMode === 'full-stack' ? (
          <div className="sim-arena">
            <div className="arena-header">
              <h2>End-to-End Protocol Journey</h2>
              <p>Full round-trip: Client request down → across wire → Server processes → response back → Client renders.</p>
            </div>

            {/* Phase Banner */}
            {simStep > 0 && (
              <div className={`phase-banner ${FULL_STACK_STEPS[simStep - 1].phase === 'RESPONSE' ? 'response' : 'request'}`}>
                <span className="phase-icon">{FULL_STACK_STEPS[simStep - 1].phase === 'RESPONSE' ? '← ' : '→ '}</span>
                PHASE: {FULL_STACK_STEPS[simStep - 1].phase}
                <span className="phase-sub">{FULL_STACK_STEPS[simStep - 1].phase === 'REQUEST' ? '(Client → Server)' : '(Server → Client)'}</span>
              </div>
            )}

            <div className="stack-grid">
              {renderStack('sender')}

              <div className="transit-zone">
                <div className={`wire-path ${activeStackSide === 'wire' ? 'active' : ''}`}>
                  <div className="signal-flow"></div>
                  {activeStackSide === 'wire' && (
                    <div className="wire-packet">{FULL_STACK_STEPS[simStep - 1]?.msg}</div>
                  )}
                </div>
                <div className="transit-label">Physical Media (Cat6 / Fiber / Undersea Cable)</div>
              </div>

              {renderStack('receiver')}
            </div>

            {/* HUD with Detail */}
            <div className="sim-controls-hud">
              <div className="hud-card">
                {simStep > 0 ? (
                  <div className="hud-content">
                    <div className="hud-step">STAGE {simStep} OF {FULL_STACK_STEPS.length}</div>
                    <div className="hud-title">{FULL_STACK_STEPS[simStep - 1].msg}</div>
                    <div className="hud-detail">{FULL_STACK_STEPS[simStep - 1].detail}</div>
                  </div>
                ) : (
                  <div className="hud-content idle">
                    <div className="hud-title">Ready for Full Round-Trip</div>
                    <p>22 stages: REQUEST (11 steps) + RESPONSE (11 steps). Each step explains what happens in RAM, Kernel, and Hardware.</p>
                  </div>
                )}
              </div>

              <div className="control-groups">
                <button className="btn-icon" onClick={handlePrev} disabled={simStep < 1}>
                  <ArrowLeft size={18} />
                </button>

                {isAutoPlay ? (
                  <button className="btn-main pulse" onClick={handleAutoPlay}>
                    <Pause size={20} fill="white" /> Pause
                  </button>
                ) : (
                  <button className="btn-main" onClick={finished ? resetSim : handleNext} >
                    {finished ? <><RotateCcw size={20} /> Restart</> : <><Play size={20} fill="white" /> {simStep === 0 ? 'Start Flow' : 'Next Step'}</>}
                  </button>
                )}

                <button className="btn-icon" onClick={handleAutoPlay} disabled={finished} title="Auto-play">
                  <Activity size={18} color={isAutoPlay ? 'var(--primary)' : 'currentColor'} />
                </button>

                <button className="btn-icon" onClick={resetSim} title="Reset">
                  <RotateCcw size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* ——— LAYER DEEP-DIVE ——— */
          <div className="details-view">
            <div className="layer-header">
              <button className="back-link" onClick={() => setViewMode('full-stack')}>
                <ArrowLeft size={14} /> Back to Full Stack
              </button>
              <div className="layer-nav-pills">
                {LAYERS.map(l => (
                  <button
                    key={l.id}
                    className={`pill ${currentLayerId === l.id ? 'active' : ''}`}
                    style={{ '--pill-color': l.color }}
                    onClick={() => setCurrentLayerId(l.id)}
                  >
                    {l.icon} {l.name}
                  </button>
                ))}
              </div>
              <h1>{LAYER_CONTENT[currentLayerId].title}</h1>
              <p className="subtitle">{LAYER_CONTENT[currentLayerId].subtitle}</p>
            </div>

            <div className="inspector-grid">
              {/* LEFT: Protocol Fields & Hex */}
              <div className="card">
                <div className="card-header">Protocol Headers & Fields</div>
                <p className="card-subtext">{LAYER_CONTENT[currentLayerId].description}</p>

                <table className="field-table" style={{ marginTop: 20 }}>
                  <thead><tr><th>Field</th><th>Value</th><th>Size</th></tr></thead>
                  <tbody>
                    {LAYER_CONTENT[currentLayerId].fields.map((f, i) => (
                      <tr key={i}>
                        <td>{f.name}</td>
                        <td className="field-val">{f.value}</td>
                        <td style={{ fontSize: 11, color: 'var(--text-dim)' }}>{f.bits}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div style={{ marginTop: 32 }}>
                  <div className="card-header">Hex Representation</div>
                  <div className="hex-grid" style={{ marginTop: 12 }}>
                    {LAYER_CONTENT[currentLayerId].hex.bytes.map((b, i) => (
                      <div key={i} className="hex-cell" title={LAYER_CONTENT[currentLayerId].hex.labels[i]}>{b}</div>
                    ))}
                  </div>
                  <div className="hex-legend">
                    {LAYER_CONTENT[currentLayerId].hex.labels.filter((v, i, a) => a.indexOf(v) === i).map((label, i) => (
                      <span key={i} className="hex-legend-item">{label}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT: System Interactions */}
              <div className="system-interaction-panel">
                <div className="interaction-title">HOW IT INTERACTS WITH THE SYSTEM</div>

                <div className="interaction-card">
                  <div className="int-icon">🔌</div>
                  <div className="int-label">HARDWARE / NIC</div>
                  <div className="int-content">{LAYER_CONTENT[currentLayerId].systemInteractions?.hardware}</div>
                </div>

                <div className="interaction-card">
                  <div className="int-icon">🧠</div>
                  <div className="int-label">RAM / BUFFERS</div>
                  <div className="int-content">{LAYER_CONTENT[currentLayerId].systemInteractions?.ram}</div>
                </div>

                <div className="interaction-card">
                  <div className="int-icon">⚙️</div>
                  <div className="int-label">OS KERNEL</div>
                  <div className="int-content">{LAYER_CONTENT[currentLayerId].systemInteractions?.kernel}</div>
                </div>

                <div className="architecture-visual">
                  <div className="arch-layer user">User Space (Application)</div>
                  <div className="arch-divider">↕ System Calls</div>
                  <div className="arch-layer kernel">Kernel Space (TCP/IP Stack)</div>
                  <div className="arch-divider">↕ Drivers / DMA</div>
                  <div className="arch-layer hw">Hardware (NIC / PHY)</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ——— DISCLAIMER ——— */}
      <div style={{ textAlign: 'center', padding: '10px 24px', fontSize: 11, color: 'var(--text-dim)', borderTop: '1px solid var(--border)', background: 'var(--bg-card)', letterSpacing: 0.3, lineHeight: 1.6 }}>
        <Layers size={12} style={{ verticalAlign: 'middle', marginRight: 6, opacity: 0.6 }} />
        This simulator models the TCP/IP stack augmented with the Physical Layer (L1), giving a complete view of the end-to-end data flow — from raw bit transmission on the wire all the way up to the Application Layer.
      </div>

      {/* ——— FOOTER ——— */}
      <footer className="footer">
        ideated, designed and developed by CharanTheAiGuy <span style={{ color: 'var(--primary)', margin: '0 8px' }}>©</span> nDimensions.AI
      </footer>
    </div>
  );
}
