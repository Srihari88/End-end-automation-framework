import { Page, Locator } from '@playwright/test';
import { BasePage } from './base.page';
import { logger } from '../utils/logger';

export class CheckoutPage extends BasePage {
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;
  readonly paymentInfoLabel: Locator;
  readonly shippingInfoLabel: Locator;
  readonly totalInfoLabel: Locator;
  readonly subtotalLabel: Locator;
  readonly taxLabel: Locator;
  readonly totalLabel: Locator;
  readonly checkoutCompleteContainer: Locator;
  readonly completeHeader: Locator;
  readonly backToProducts: Locator;
  readonly secondaryHeader: Locator;
  readonly checkoutInfo: Locator;
  readonly title: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.cancelButton = page.getByTestId('cancel');
    this.paymentInfoLabel = page.getByTestId('payment-info-label');
    this.shippingInfoLabel = page.getByTestId('shipping-info-label');
    this.totalInfoLabel = page.getByTestId('total-info-label');
    this.subtotalLabel = page.getByTestId('subtotal-label');
    this.taxLabel = page.getByTestId('tax-label');
    this.totalLabel = page.getByTestId('total-label');
    this.checkoutCompleteContainer = page.getByTestId('checkout-complete-container');
    this.completeHeader = page.getByTestId('complete-header');
    this.backToProducts = page.getByTestId('back-to-products');
    this.secondaryHeader = page.getByTestId('secondary-header');
    this.checkoutInfo = page.locator('.checkout_info');
    this.title = page.getByTestId('title');
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    logger.info(`CheckoutPage: filling checkout information firstName='${firstName}', lastName='${lastName}'`);
    await this.firstName.fill(firstName);
    await this.lastName.fill(lastName);
    await this.postalCode.fill(postalCode);
  }

  async continue() {
    logger.info('CheckoutPage: clicking Continue');
    await this.continueButton.click();
  }

  async finish() {
    logger.info('CheckoutPage: clicking Finish');
    await this.finishButton.click();
  }

  getItemTitleLinkById(itemId: string) {
    return this.page.getByTestId(`${itemId}-title-link`);
  }
}
