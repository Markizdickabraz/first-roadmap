<?php

namespace Vendor\Todo\Model;

use Magento\Framework\Model\AbstractModel;

class Task extends AbstractModel
{
    protected function _construct()
    {
        $this->_init('Vendor\Todo\Model\ResourceModel\Task');
    }

    // Setters
    public function setTitle($title)
    {
        return $this->setData('title', $title);
    }

    public function setText($text)
    {
        return $this->setData('text', $text);
    }

    public function setDate($date)
    {
        return $this->setData('date', $date);
    }

    public function setStatus($status)
    {
        return $this->setData('status', $status);
    }

    // Getters
    public function getTitle()
    {
        return $this->getData('title');
    }

    public function getText()
    {
        return $this->getData('text');
    }

    public function getDate()
    {
        return $this->getData('date');
    }

    public function getStatus()
    {
        return $this->getData('status');
    }
}
