export interface NetworkInformation {
  effectiveType: string;
  downlink: number;
  rtt: number;
  saveData: boolean;
}

// Extend Navigator interface to include connection
declare global {
  interface Navigator {
    connection?: {
      effectiveType: string;
      downlink: number;
      rtt: number;
      saveData: boolean;
    };
  }
}

export const getNetworkInfo = (): NetworkInformation => {
  // Check if Network Information API is supported
  if (navigator.connection) {
    return {
      effectiveType: navigator.connection.effectiveType || '4g',
      downlink: navigator.connection.downlink || 10,
      rtt: navigator.connection.rtt || 100,
      saveData: navigator.connection.saveData || false
    };
  }

  // Fallback for browsers that don't support Network Information API
  return {
    effectiveType: '4g',
    downlink: 10,
    rtt: 100,
    saveData: false
  };
};

export const getConnectionType = (): string => {
  const connection = navigator.connection;
  if (!connection) return 'unknown';
  
  return connection.effectiveType || 'unknown';
};

export const isSlowConnection = (): boolean => {
  const connection = navigator.connection;
  if (!connection) return false;
  
  return connection.effectiveType === 'slow-2g' || 
         connection.effectiveType === '2g' ||
         connection.saveData;
};

export const getDownlinkSpeed = (): number => {
  const connection = navigator.connection;
  if (!connection) return 10; // Default to 10 Mbps
  
  return connection.downlink || 10;
};

export const addNetworkChangeListener = (callback: (info: NetworkInformation) => void): void => {
  if (navigator.connection) {
    const handleChange = () => {
      callback(getNetworkInfo());
    };
    
    navigator.connection.addEventListener('change', handleChange);
  }
};
