#!/bin/bash -
#===============================================================================
#
#          FILE: export.sh
#
#         USAGE: ./export.sh
#
#   DESCRIPTION:
#
#       OPTIONS: ---
#  REQUIREMENTS: ---
#          BUGS: ---
#         NOTES: ---
#        AUTHOR: YOUR NAME (),
#  ORGANIZATION:
#       CREATED: 01/18/2018 17:47
#      REVISION:  ---
#===============================================================================

set -o nounset                              # Treat unset variables as an error

mongodump --port=3001 -o ../dump
tar czf ../dump ./dump.tar.gz

