import mqtt, { MqttClient, type IClientOptions } from 'mqtt';

class MqttClientInstance {
  private static instance: MqttClientInstance | null = null;
  private client: MqttClient | null = null;

  private constructor() {}

  public static getInstance(): MqttClientInstance {
    if (this.instance === null) {
      this.instance = new MqttClientInstance();
    }
    return this.instance;
  }

  public connect(clientId: string) {
    if (this.client) {
      console.warn('Client is already connected');
      return;
    }

    const options: IClientOptions = {
      clientId: `nuxt_client_${clientId}_${Math.random()
        .toString(16)
        .substr(2, 8)}`,
      connectTimeout: 4000,
      clean: true,
      port: 9001,
      username: 'demo',
      password: '080100',
    };

    this.client = mqtt.connect('mqtt://localhost', options);

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
    });

    this.client.on('message', (topic: string, message: Buffer) => {
      console.log(`Received message: ${message.toString()} on topic: ${topic}`);
    });

    this.client.on('error', (err: Error) => {
      console.error('Connection error:', err);
    });
  }

  public disconnect() {
    if (this.client) {
      this.client.end();
      this.client = null;
      console.log('Disconnected from MQTT broker');
    } else {
      console.warn('Client is not connected');
    }
  }
}

export default defineNuxtPlugin((nuxtApp) => {
  const mqttClient = MqttClientInstance.getInstance();
  return {
    provide: {
      clientMqtt: mqttClient,
    },
  };
});
