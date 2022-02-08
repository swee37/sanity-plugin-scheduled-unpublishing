import {EarthAmericasIcon} from '@sanity/icons'
import {Autocomplete, Button, Dialog, Inline, Stack, Text} from '@sanity/ui'
import {TimeZone} from '@vvo/tzdb'
import React from 'react'
import useTimeZone, {allTimeZones, getLocalTimeZone} from '../hooks/useTimeZone'

const options = allTimeZones.map((tz) => ({
  value: tz.currentTimeFormat,
}))

interface Props {
  onClose?: () => void
}

/**
 * Removes cities from timezone format for cleaner UI.
 * "-11:00 Samoa Time - Pago Pago, ..." => "Samoa Time (GMT -11:00)"
 */
function formatValue(value: TimeZone['currentTimeFormat']) {
  const offsetAndName = value?.split(' - ')[0]

  if (!offsetAndName) return ''

  const [offset, ...nameParts] = offsetAndName.split(' ')
  return `${nameParts.join(' ')} (GMT ${offset})`
}

const DialogTimeZone = (props: Props) => {
  const {timeZone, timeIsLocal, setTimeZone} = useTimeZone()
  const [selectedTz, setSelectedTz] = React.useState<TimeZone['currentTimeFormat'] | undefined>(
    timeZone.currentTimeFormat
  )

  const {onClose} = props
  return (
    <Dialog header="Select time zone" id="time-zone" onClose={onClose} width={0}>
      <Stack padding={4} space={3}>
        <Text>The selected timezone will change how dates are represented in schedules</Text>
        <Autocomplete
          icon={EarthAmericasIcon}
          id="timezone"
          options={options}
          placeholder="Timezone"
          onChange={(value) => setSelectedTz(value)}
          value={selectedTz}
          renderValue={formatValue}
          tabIndex={-1}
          fontSize={1}
          popover={{
            constrainSize: true,
            placement: 'bottom-start',
          }}
        />
        <Inline space={2}>
          <Button
            fontSize={1}
            onClick={() => {
              setTimeZone()
              onClose?.()
            }}
            text={`Use local time (${getLocalTimeZone().alternativeName})`}
            disabled={timeIsLocal}
            mode="ghost"
          />
          <Button
            fontSize={1}
            onClick={() => {
              setTimeZone(selectedTz)
              onClose?.()
            }}
            text={`Save timezone`}
            disabled={!selectedTz}
            tone="primary"
          />
        </Inline>
      </Stack>
    </Dialog>
  )
}

export default DialogTimeZone
