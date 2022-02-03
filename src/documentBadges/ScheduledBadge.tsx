import type {DocumentBadgeComponent} from '@sanity/base'
import {format} from 'date-fns'
import usePollSchedules from '../hooks/usePollSchedules'
import {debugWithName} from '../utils/debug'

const debug = debugWithName('scheduled-badge')

const ScheduledBadge: DocumentBadgeComponent = (props) => {
  // Poll for document schedules
  const {schedules} = usePollSchedules({documentId: props.id, state: 'scheduled'})
  debug('schedules', schedules)

  const upcomingSchedule = schedules?.[0]

  if (!upcomingSchedule) {
    return null
  }

  // Example: Fri 24 Dec 2021 at 6:00 AM
  const formattedDateTime = format(new Date(upcomingSchedule.executeAt), `iii d MMM yyyy 'at' p`)

  return {
    color: 'primary',
    label: `Scheduled`,
    title: formattedDateTime,
  }
}

export default ScheduledBadge
