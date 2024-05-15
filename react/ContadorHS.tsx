import React, { useEffect, useState } from 'react'
import { useCssHandles } from 'vtex.css-handles'

interface ContadorHSProps {
  leftImage: string
  rightImage: string
  title: string
  targetHour: number
  targetMinute: number
  targetSecond: number
}

const CSS_HANDLES = [
  'contadorImageLeft',
  'contadorImageRight',
  'contadorTitle',
  'contadorTime',
  'contadorContainer',
] as const

function ContadorHS({
  leftImage,
  rightImage,
  targetHour,
  targetMinute,
  targetSecond,
  title,
}: ContadorHSProps) {
  const [targetHourState, setTargetHourState] = useState<number>(targetHour)
  const [targetMinuteState, setTargetMintuteState] = useState<number>(
    targetMinute
  )
  const [targetSecondState, setTargetSecondState] = useState<number>(
    targetSecond
  )
  const [hourLeft, setHourLeft] = useState<string>('')
  const [minuteLeft, setMinuteLeft] = useState<string>('')
  const [secondLeft, setSecondLeft] = useState<string>('')

  const handles = useCssHandles(CSS_HANDLES)

  const calculateTimeLeft = () => {
    const now = new Date() //Fecha actual
    const targetDate = new Date()
    targetDate.setHours(targetHourState, targetMinuteState, targetSecondState) //Establecemos la hora de finalización u hora objetivo

    const timeDifference = targetDate.getTime() - now.getTime() //Diferencia de tiempo entre la fecha actual y la fecha objetivo+

    const hours = Math.floor(timeDifference / (1000 * 60 * 60))
      .toString()
      .padStart(2, '0')
    const minutes = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    )
      .toString()
      .padStart(2, '0')
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0')

    setHourLeft(`${hours}`)
    setMinuteLeft(`${minutes}`)
    setSecondLeft(`${seconds}`)
  }

  useEffect(() => {
    setTargetHourState(targetHour)
    setTargetMintuteState(targetMinute)
    setTargetSecondState(targetSecond)
    calculateTimeLeft()
  }, [targetHour, targetMinute, targetSecond])

  useEffect(() => {
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [targetHourState, targetMinuteState, targetSecondState])

  return (
    <div className={`${handles.contadorContainer}`}>
      <div>
        <img
          src={leftImage}
          alt=""
          className={`${handles.contadorImageLeft}`}
        />
      </div>
      <div>
        <h2 className={`${handles.contadorTitle}`}>{title}</h2>
        <p className={`${handles.contadorTime}`}>
          {hourLeft}:{minuteLeft}:{secondLeft}
        </p>
      </div>
      <div>
        <img
          src={rightImage}
          alt=""
          className={`${handles.contadorImageRight}`}
        />
      </div>
    </div>
  )
}

export default ContadorHS
