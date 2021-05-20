## 命令行说明
- TX errors = CRC, checksum mismatch
- Frame = Packet fails to end on a 32bit/4 byte boundary
    + Not sure if this includes small packets ( <64bytes ) or large packets.
- Collisions = This interface is running half duplex.
    + It is detecting TX and RX packets at the same time.
    + This is bad in a HDuplex environment (Hubs)
    + Switched environments operate full duplex.
    + Collision detection is disabled in FD mode.
    + A mismatch in duplex is very bad for throughput.
    + (Switch = FD but Host = HD) 
    + The HDuplex device will terminate transmission if collisions are detected.
    + Some devices used to report late collisions which were very bad in hub environments.
- Carrier = Loss of link pulse. Sometimes recreated by removing and installing the Ethernet cable.
    + If this counter is high, the link is flapping. (up/down)
    + Either this Ethernet chip is having issues or the device at the other end of the cable is having issues
- Overruns = The NIC has a Buffer of X bytes and this filled and was exceeded before the buffer could be emptied.
    + The Excess is the overrun.
