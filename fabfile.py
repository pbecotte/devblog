from fabric.api import env, cd, run, task, prompt, put
import os
from gitric.api import git_seed, git_reset


env.use_ssh_config = True
env.disable_known_hosts = True


@task
def blog():
    # This task chooses a machine to run a subsequent job on
    env.repo_path = '/home/rancher/blog'
    env.hosts = ['paulbecotte.com']
    env.user = 'rancher'


@task
def provision():
    run('docker create --name rancher-data -v /tmp -v /var/jenkins_home rancher/server true')
    run('docker run -d --volumes-from rancher-data --restart=always -p 8080:8080 rancher/server')
