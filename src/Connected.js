import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';

// VPN Server Class
class VPNServer {
  constructor(serverLocation) {
    this.serverLocation = serverLocation;
    this.connectedClients = new Map();
    this.encryptionKey = this.generateKey();
    this.isRunning = false;
    this.traffic = [];
    this.startTime = null;
  }

  generateKey() {
    // Simplified key generation for React Native
    const array = new Uint8Array(32);
    for (let i = 0; i < 32; i++) {
      array[i] = Math.floor(Math.random() * 256);
    }
    return Array.from(array)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }

  start() {
    this.isRunning = true;
    this.startTime = new Date();
    return `VPN Server started in 102.219.85.231 (Pretoria SahdsoftVPS)`;
  }

  stop() {
    this.isRunning = false;
    this.connectedClients.clear();
    this.startTime = null;
    return 'VPN Server stopped';
  }

  connectClient(clientId, clientIP) {
    if (!this.isRunning) {
      throw new Error('Server is not running');
    }

    const virtualIP = this.generateVirtualIP();
    const encryptedConnection = {
      realIP: this.encrypt(clientIP),
      virtualIP: virtualIP,
      connectionTime: new Date(),
      trafficCount: 0
    };

    this.connectedClients.set(clientId, encryptedConnection);
    return `Client ${clientId} connected with virtual IP: ${virtualIP}`;
  }

  disconnectClient(clientId) {
    if (this.connectedClients.has(clientId)) {
      this.connectedClients.delete(clientId);
      return `Client ${clientId} disconnected`;
    }
    return `Client ${clientId} not found`;
  }

  encrypt(data) {
    return Buffer.from(data + this.encryptionKey).toString('base64');
  }

  decrypt(data) {
    return Buffer.from(data, 'base64')
      .toString('utf-8')
      .replace(this.encryptionKey, '');
  }

  generateVirtualIP() {
    const octets = Array.from({ length: 4 }, () => 
      Math.floor(Math.random() * 255));
    return `10.${octets[1]}.${octets[2]}.${octets[3]}`;
  }

  routeTraffic(clientId, destination) {
    if (!this.connectedClients.has(clientId)) {
      throw new Error('Client not connected to VPN');
    }

    const client = this.connectedClients.get(clientId);
    client.trafficCount++;

    const trafficLog = {
      timestamp: new Date(),
      clientId: clientId,
      virtualIP: client.virtualIP,
      destination: this.encrypt(destination),
      bytes: Math.floor(Math.random() * 1000)
    };

    this.traffic.push(trafficLog);
    return {
      status: 'routed',
      through: this.serverLocation,
      encryptedDestination: trafficLog.destination
    };
  }

  getStats() {
    return {
      location: this.serverLocation,
      activeClients: this.connectedClients.size,
      totalTraffic: this.traffic.length,
      uptime: this.isRunning ? 
        Math.floor((new Date() - this.startTime) / 1000) : 0,
      isRunning: this.isRunning
    };
  }
}

// Components
const ClientCard = ({ client, clientId, onDisconnect }) => (
  <View style={styles.clientCard}>
    <Text>ID: {clientId}</Text>
    <Text>Virtual IP: {client.virtualIP}</Text>
    <Text>Connected: {client.connectionTime.toLocaleTimeString()}</Text>
    <TouchableOpacity 
      style={styles.disconnectButton}
      onPress={() => onDisconnect(clientId)}
    >
      <Text style={styles.buttonText}>Disconnect</Text>
    </TouchableOpacity>
  </View>
);

const LogView = ({ logs }) => (
  <ScrollView style={styles.logView}>
    {logs.map((log, index) => (
      <Text key={index} style={styles.logText}>
        [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
      </Text>
    ))}
  </ScrollView>
);

// Main App Component
const VPNSimulator = () => {
  const [vpn, setVpn] = useState(null);
  const [logs, setLogs] = useState([]);
  const [clients, setClients] = useState([]);
  const [serverStatus, setServerStatus] = useState('Stopped');

  const writeToLog = (message) => {
    setLogs(prevLogs => [...prevLogs, {
      timestamp: new Date(),
      message
    }]);
  };

  const updateClients = () => {
    if (vpn) {
      setClients(Array.from(vpn.connectedClients.entries()));
    }
  };

  const startServer = () => {
    const newVpn = new VPNServer('Amsterdam');
    const message = newVpn.start();
    setVpn(newVpn);
    writeToLog(message);
    writeToLog(`Encryption Key: ${newVpn.encryptionKey}`);
    setServerStatus('Running');
    
    // Auto-connect a client after server starts
    setTimeout(() => {
      try {
        const connectMessage = newVpn.connectClient('user1', '102.219.85.231');
        writeToLog(connectMessage);
        updateClients();
        
        // Simulate traffic
        setTimeout(() => {
          try {
            const result = newVpn.routeTraffic('user1', 'www.example.com');
            writeToLog(`Traffic routed for user1: ${JSON.stringify(result)}`);
          } catch (error) {
            writeToLog(`Traffic error: ${error.message}`);
          }
        }, 1000);
      } catch (error) {
        writeToLog(`Connection error: ${error.message}`);
      }
    }, 1000);
  };

  const stopServer = () => {
    if (vpn) {
      const message = vpn.stop();
      writeToLog(message);
      setVpn(null);
      setServerStatus('Stopped');
      setClients([]);
    }
  };

  const disconnectClient = (clientId) => {
    if (vpn) {
      const message = vpn.disconnectClient(clientId);
      writeToLog(message);
      updateClients();
    }
  };

  useEffect(() => {
    startServer();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Keidens</Text>
      
      <View style={styles.mainContainer}>
        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>
            Server Status: {serverStatus}
          </Text>
        </View>

        <View style={styles.clientsContainer}>
          <Text style={styles.sectionTitle}>Connected Clients</Text>
          <ScrollView>
            {clients.map(([clientId, client]) => (
              <ClientCard
                key={clientId}
                client={client}
                clientId={clientId}
                onDisconnect={disconnectClient}
              />
            ))}
          </ScrollView>
        </View>

        <LogView logs={logs} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8D51FF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    padding: 20,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 8,
    padding: 20,
  },
  statusContainer: {
    padding: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    marginBottom: 20,
  },
  statusText: {
    fontSize: 16,
  },
  clientsContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  clientCard: {
    padding: 10,
    backgroundColor: '#e9ecef',
    borderRadius: 4,
    marginBottom: 10,
  },
  disconnectButton: {
    backgroundColor: '#dc3545',
    padding: 8,
    borderRadius: 4,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
  },
  logView: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 10,
    borderRadius: 4,
  },
  logText: {
    fontFamily: 'monospace',
  },
});

export default VPNSimulator;
