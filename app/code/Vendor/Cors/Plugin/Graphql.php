<?php

namespace Vendor\Cors\Plugin;

use Magento\Framework\App\RequestInterface;
use Magento\Framework\App\ResponseInterface;
use Magento\GraphQl\Controller\GraphQl as GraphQlController;

class Graphql
{
    /**
     * @param GraphQl $subject
     * @param callable $proceed
     * @param RequestInterface $request
     * @return ResponseInterface
     */
    public function aroundDispatch(GraphQlController $subject, callable $proceed, RequestInterface $request): ResponseInterface
    {

        header("Access-Control-Allow-Origin: http://localhost:3000");
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
        header("Access-Control-Allow-Headers: Content-Type, Authorization");
        header("Access-Control-Allow-Credentials: true");

        return $proceed($request);
    }

    /**
     * @param GraphQl $subject
     * @param ResponseInterface $result
     * @param RequestInterface $request
     * @return ResponseInterface
     */
    public function afterDispatch(GraphQlController $subject, ResponseInterface $result, RequestInterface $request): ResponseInterface
    {
        $result->setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        $result->setHeader('Access-Control-Allow-Method', 'GET, POST, PUT, DELETE, OPTIONS');
        $result->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        $result->setHeader('Access-Control-Allow-Credentials', true);



        return $result;
    }
}