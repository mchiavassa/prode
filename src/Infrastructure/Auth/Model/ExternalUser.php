<?php

namespace Prode\Infrastructure\Auth\Model;

abstract class ExternalUser
{
    private $id;
    private $email;
    private $name;
    private $pictureUrl;

    public function __construct($id, $email, $name = null, $pictureUrl = null)
    {
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->pictureUrl = $pictureUrl;
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
