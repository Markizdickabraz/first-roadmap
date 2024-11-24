<?php


namespace Vendor\Module\ViewModel;

use Magento\Customer\Model\Session;

class CustomerData implements \Magento\Framework\View\Element\Block\ArgumentInterface
{
    private Session $customerSession;

    public function __construct(Session $customerSession)
    {
        $this->customerSession = $customerSession;
    }

    public function getCustomerName(): string
    {
        if (!$this->isLoggedIn()) {
            return 'Guest';
        }

        $customer = $this->customerSession->getCustomer();
        return $customer->getFirstname() . ' ' . $customer->getLastname();
    }

    public function isLoggedIn(): bool
    {
        return $this->customerSession->isLoggedIn();
    }
}
