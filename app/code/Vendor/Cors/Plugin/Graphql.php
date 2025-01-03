<?php

namespace Vendor\Cors\Plugin;

use Magento\Framework\App\RequestInterface;
use Magento\Framework\App\ResponseInterface;
use Magento\GraphQl\Controller\GraphQl as GraphQlController;

class Graphql
{
    public function beforeDispatch(
        GraphQlController $subject,
        RequestInterface $request
    ) {
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            header('Access-Control-Allow-Origin: http://localhost:3000');
            header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE');
            header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
            header('Access-Control-Allow-Credentials: true');
            header('Content-Length: 0');
            header('Content-Type: text/plain');
            exit(0);
        }
    }
    /**
     * @param GraphQl $subject
     * @param ResponseInterface $result
     * @param RequestInterface $request
     * @return ResponseInterface
     */
    public function afterDispatch(GraphQlController $subject, ResponseInterface $result, RequestInterface $request): ResponseInterface
    {
        $result->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000', true);
        $result->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE', true);
        $result->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With', true);
        $result->setHeader('Access-Control-Allow-Credentials', 'true', true);
        return $result;
    }
}