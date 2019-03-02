variable "do_token" {}

# Configure the DigitalOcean Provider
provider "digitalocean" {
  token = "${var.do_token}"
}

terraform {
  backend "s3" {
    skip_requesting_account_id = true
    skip_credentials_validation = true
    skip_get_ec2_platforms = true
    skip_metadata_api_check = true
    endpoint = "sfo2.digitaloceanspaces.com"
    region = "us-east-1"
    bucket = "devops"
    key = "terraform.tfstate"
  }
}

data "terraform_remote_state" "sambuca" {
  backend = "s3"
  config {
    skip_requesting_account_id = true
    skip_credentials_validation = true
    skip_get_ec2_platforms = true
    skip_metadata_api_check = true
    endpoint = "sfo2.digitaloceanspaces.com"
    region = "us-east-1"
    bucket = "sambuca"
    key = "terraform.tfstate"
  }
}

provider "kubernetes" {
  host = "${data.terraform_remote_state.sambuca.k8s_host}"

  client_certificate = "${data.terraform_remote_state.sambuca.k8s_client_certificate}"
  client_key = "${data.terraform_remote_state.sambuca.k8s_client_key}"
  cluster_ca_certificate = "${data.terraform_remote_state.sambuca.k8s_client_ca_certificate}"
}
