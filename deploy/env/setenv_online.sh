#!/bin/sh

NODE_ENV='production:online'
consul_service_tags='online'
consul_service_port='8080'
consul_health_url='/i/health'
processor_num='max'
opts_ext=''

export NODE_ENV
