<?php

namespace App\Services\Auth;

use InvalidArgumentException;

class ExternalUser
{
    private $provider;
    private $id;
    private $email;
    private $name;
    private $pictureUrl;

    public function __construct($provider, $id, $email, $name, $pictureUrl)
    {
        $this->validateParams($provider, $id, $email, $name, $pictureUrl);

        $this->provider = $provider;
        $this->id = $id;
        $this->name = $name;
        $this->email = $email;
        $this->pictureUrl = $pictureUrl;
    }

    private function validateParams($provider, $id, $email, $name, $pictureUrl)
    {
        if (!SocialNetworkProvider::isValid($provider)) {
            throw new InvalidArgumentException('The provider is not valid.');
        }
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
    public function getProvider()
    {
        return $this->provider;
    }

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
