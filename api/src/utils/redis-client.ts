import { RedisCommandArgument } from '@node-redis/client/dist/lib/commands';
import { Logger } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

export class RedisClient {
  client: RedisClientType;

  constructor() {
    this._setRedis();
  }
  private async _setRedisClient() {
    this.client = createClient();
  }

  private async _setRedis() {
    this._setRedisClient();

    await this.client.connect();

    this.client.on('error', (err) => {
      Logger.error('Redis ' + err);
    });
  }

  async set(
    key: RedisCommandArgument,
    value: number | RedisCommandArgument,
  ): Promise<any> {
    return await this.client.set(key, value);
  }

  async get(key: RedisCommandArgument): Promise<any> {
    return await this.client.get(key);
  }

  async del(key: RedisCommandArgument): Promise<any> {
    return await this.client.del(key);
  }

  async close(): Promise<void> {
    return await this.client.disconnect();
  }
}
