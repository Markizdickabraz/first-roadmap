<?php

namespace Vendor\Todo\Model\ResourceModel;

use Magento\Framework\Model\ResourceModel\Db\AbstractDb;

class Task extends AbstractDb
{
    protected function _construct()
    {
        $this->_init('vendor_todo_task', 'task_id');
    }

    public function deleteTask($taskId)
    {
        $connection = $this->getConnection();
        $connection->delete($this->getMainTable(), ['task_id = ?' => $taskId]);
    }
}
