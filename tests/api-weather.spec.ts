import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const apiKey = process.env.API_KEY;
const city = 'Islamabad';
const countryCode = 'PK';

test.describe('OpenWeather API', () => {
  test('should return the current temperature for Islamabad', async ({ request }) => {
    const response = await request.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${apiKey}&units=metric`);
    
    expect(response.status()).toBe(200);
    
    const responseBody = await response.json();
    
    expect(responseBody.name).toBe(city);
    expect(responseBody.main).toHaveProperty('temp');
    
    console.log(`Current temperature in ${city}: ${responseBody.main.temp}°C`);
  });
});