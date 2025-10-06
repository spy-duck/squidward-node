#!/usr/bin/env bash

function do_recreate_tag() {
    tag=$2
    git fetch origin && \
    git tag -d "$tag" && \
    git tag "$tag" && \
    git push --delete origin "$tag" && \
    git push origin tag "$tag"
}

function do_amend() {
    git add .
    git commit --amend --no-edit
    git push --force
}

 case $1 in
      recreate_tag )
        do_recreate_tag $1 $2
      ;;
      amend )
        do_amend
      ;;
      -h|--help )
       echo "Available commands [recreate_tag]"
       echo ""
       echo "recreate_tag <tag_name>"
       ;;
    * ) echo "Available commands [recreate_tag]";;
esac
