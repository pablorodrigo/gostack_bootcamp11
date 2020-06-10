import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import cacheConfig from '@config/cache';
import Redis, { Redis as RedisClient } from 'ioredis';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  async save(key: string, value: string): Promise<void> {
    await this.client.set(key, value);
  }

  async recover(key: string): Promise<string | null> {
    const data = await this.client.get(key);

    return data;
  }

  async invalidate(key: string): Promise<void> {
    return Promise.resolve(undefined);
  }
}
