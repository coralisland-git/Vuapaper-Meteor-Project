#!/bin/bash -
#===============================================================================
#
#          FILE: restore.sh
#
#         USAGE: ./restore.sh
#
#   DESCRIPTION:
#
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: YOUR NAME (),
#  ORGANIZATION:
#       CREATED: 01/18/2018 17:48
#      REVISION:  ---
#===============================================================================

set -o nounset                              # Treat unset variables as an error

tar xzf $@
mongorestore --drop --port=3001 dump

