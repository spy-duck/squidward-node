#!/bin/bash

if [ "$VECTOR_DEBUG" == "true" ]; then
  echo "Starting vector... [DEBUG CONFIG]"
  /usr/local/bin/vector --config /etc/vector/vector.yaml --config /etc/vector/vector.debug.yaml
else
  echo "Starting vector..."
  /usr/local/bin/vector --config /etc/vector/vector.yaml
fi