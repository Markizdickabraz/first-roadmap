<?php

namespace Vendor\Todo\Model\Resolver;

use Magento\Framework\GraphQl\Query\ResolverInterface;
use Magento\Framework\GraphQl\Schema\Type\ResolveInfo;
use Vendor\Todo\Model\TaskFactory;
use Magento\Framework\Exception\LocalizedException;

class CreateTask implements ResolverInterface
{
    protected $taskFactory;

    public function __construct(TaskFactory $taskFactory)
    {
        $this->taskFactory = $taskFactory;
    }

    public function resolve(
        $field,
        $context,
        ResolveInfo $info,
        array $value = null,
        array $args = null
    ) {

        if (!$context->getUserId()) {
            throw new LocalizedException(__('User is not authorized.'));
        }

        $customerId = $context->getUserId();

        if (empty($args['input']['title']) || empty($args['input']['date'])) {
            throw new LocalizedException(__('Title and Date are required fields.'));
        }

        $task = $this->taskFactory->create();
        $task->setData([
            'title' => $args['input']['title'],
            'text' => $args['input']['text'] ?? '',
            'date' => $args['input']['date'],
            'status' => 'pending',
            'customer_id' => $customerId
        ]);

        try {
            $task->save();
        } catch (\Exception $e) {
            throw new LocalizedException(__('Unable to save task: %1', $e->getMessage()));
        }

        return [
            'id' => $task->getId(),
            'title' => $task->getTitle(),
            'text' => $task->getText(),
            'date' => $task->getDate(),
            'status' => $task->getStatus()
        ];
    }
}
