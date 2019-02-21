#!/bin/bash

# PREF_OUT=" "
PREF_OUT="begin"
while true
do
  PREF_NEW=$(ls -lRS --time-style=full-iso $1)
  # PREF_NEW=$(echo hello)
  # echo $PREF_OUT $PREF_NEW
  # PREF_NEW=$((PREF_OUT + 1))
  # echo $PREF_NEW
  if [ "$PREF_OUT" != "$PREF_NEW" ];
  # if [[ $PREF_OUT -lt $PREF_NEW ]];
  then
    $(echo $2)
  fi
  PREF_OUT="$PREF_NEW"

  # echo "sleeping"
  sleep .5
done;
