<?php

namespace Vendor\Todo\Model\Resolver;

use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Magento\Framework\Exception\LocalizedException;
use Vendor\Todo\Model\ResourceModel\Task;

class DeleteTask implements ResolverInterface
{
    protected $taskResource;

    public function __construct(Task $taskResource)
    {
        $this->taskResource = $taskResource;
    }

    public function resolve(
        $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {
        if (empty($args['taskId'])) {
            throw new LocalizedException(__('Task ID is required.'));
        }

        try {
            $this->taskResource->deleteTask($args['taskId']);
        } catch (\Exception $e) {
            throw new LocalizedException(__('Unable to delete task: %1', $e->getMessage()));
        }

        return [
            'success' => true,
            'message' => __('Task deleted successfully.')
        ];
    }
}
