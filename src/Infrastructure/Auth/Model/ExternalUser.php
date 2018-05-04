<?php

namespace Prode\Infrastructure\Auth\Model;

use InvalidArgumentException;

abstract class ExternalUser
{
    private $id;
    private $email;
    private $name;
    private $pictureUrl;

    public function __construct($id, $email, $name, $pictureUrl)
    {
        $this->validateParams($id, $email, $name, $pictureUrl);

        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->pictureUrl = $pictureUrl;
    }

    private function validateParams($id, $email, $name, $pictureUrl)
    {
        if (empty($id)) {
            throw new InvalidArgumentException('The id is required.');
        }
        if (empty($name)) {
            throw new InvalidArgumentException('The name is required.');
        }
        if (empty($email)) {
            throw new InvalidArgumentException('The email is required.');
        }
        if (empty($pictureUrl)) {
            throw new InvalidArgumentException('The pictureUrl is required.');
        }
    }

    /**
     * @return string
     */
    abstract public function getProvider();

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @return string|null
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return string|null
     */
    public function getPictureUrl()
    {
        return $this->pictureUrl;
    }
}
