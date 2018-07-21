#!/usr/bin/env python

# flow-meter.py
# 2017-02-21
# Public Domain

import time
import pigpio

FLOW_GPIO = 26
RUN_TIME = 60.0
SAMPLE_TIME = 1.0

pi = pigpio.pi() # connect to Pi
if not pi.connected:
   exit()

pi.set_mode(FLOW_GPIO, pigpio.INPUT)
pi.set_pull_up_down(FLOW_GPIO, pigpio.PUD_UP)

callback = pi.callback(FLOW_GPIO) # default tally callback

stop = time.time() + RUN_TIME

try:

   while time.time() < stop:

      time.sleep(SAMPLE_TIME)

      print("tally={}".format(callback.tally()))

except KeyboardInterrupt:
   pass

print("\nexiting")

callback.cancel() # cancel callback

pi.stop() # disconnect from Pi

