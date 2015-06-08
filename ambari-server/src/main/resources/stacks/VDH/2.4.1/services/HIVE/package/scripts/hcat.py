#!/usr/bin/env python
"""
Licensed to the Apache Software Foundation (ASF) under one
or more contributor license agreements.  See the NOTICE file
distributed with this work for additional information
regarding copyright ownership.  The ASF licenses this file
to you under the Apache License, Version 2.0 (the
"License"); you may not use this file except in compliance
with the License.  You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

"""

from resource_management import *
import sys


def hcat():
  import params

  Directory(params.hive_conf_dir,
            owner=params.hcat_user,
            group=params.user_group,
  )


  Directory(params.hcat_conf_dir,
            owner=params.hcat_user,
            group=params.user_group,
  )

  Directory(params.hcat_pid_dir,
            owner=params.webhcat_user,
            recursive=True
  )

  XmlConfig("hive-site.xml",
            conf_dir=params.hive_client_conf_dir,
            configurations=params.config['configurations']['hive-site'],
            configuration_attributes=params.config['configuration_attributes']['hive-site'],
            owner=params.hive_user,
            group=params.user_group,
            mode=0644)

  hcat_TemplateConfig('hcat-env.sh')


def hcat_TemplateConfig(name):
  import params

  TemplateConfig(format("{hcat_conf_dir}/{name}"),
                 owner=params.hcat_user,
                 group=params.user_group
  )