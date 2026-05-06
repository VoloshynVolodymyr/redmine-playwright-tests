// tests/TC05_apiIssues.spec.js

import { test, expect } from '@playwright/test'

test.describe('REST API Tests', () => {
  test('TC05 - Retrieve a list of public issues in JSON format via REST API', async ({
    request
  }) => {
    const response = await request.get('/issues.json')

    await test.step('Verify HTTP status code is 200 OK', async () => {
      expect(response.status()).toBe(200)
      console.log(`HTTP Status: ${response.status()}`)
    })

    let responseBody

    await test.step('Verify response body is valid JSON', async () => {
      responseBody = await response.json()
      expect(responseBody).toBeDefined()
      console.log('Response body is valid JSON')
    })

    await test.step('Verify root element is an issues array with at least one issue', async () => {
      expect(responseBody).toHaveProperty('issues')
      expect(Array.isArray(responseBody.issues)).toBe(true)
      expect(responseBody.issues.length).toBeGreaterThan(0)

      const firstIssue = responseBody.issues[0]
      console.log(`Found ${responseBody.issues.length} issues`)
      console.log(`First issue ID: ${firstIssue.id}, Subject: ${firstIssue.subject}`)

      expect(firstIssue).toHaveProperty('id')
      expect(firstIssue).toHaveProperty('subject')
      expect(firstIssue).toHaveProperty('status')
    })

    await test.step('Verify pagination metadata (total_count, offset, limit) is present', async () => {
      expect(responseBody).toHaveProperty('total_count')
      expect(responseBody).toHaveProperty('offset')
      expect(responseBody).toHaveProperty('limit')

      console.log(`Total issues: ${responseBody.total_count}`)
      console.log(`Offset: ${responseBody.offset}`)
      console.log(`Limit: ${responseBody.limit}`)

      expect(typeof responseBody.total_count).toBe('number')
      expect(typeof responseBody.offset).toBe('number')
      expect(typeof responseBody.limit).toBe('number')
    })
  })
})
