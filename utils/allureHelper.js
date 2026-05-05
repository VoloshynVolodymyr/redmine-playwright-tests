import { allure } from 'allure-playwright';

export function addStep(name, fn) {
  return allure.step(name, fn);
}

export function addDescription(description) {
  allure.description(description);
}

export function addAttachment(name, content, type) {
  allure.attachment(name, content, type);
}