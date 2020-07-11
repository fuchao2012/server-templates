#!/bin/sh

NODE_ENV='production:test'
consul_service_tags='dev'
consul_service_port='8080'
consul_health_url='/i/health'
processor_num='max'
opts_ext=''

export NODE_ENV
