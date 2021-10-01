import { FC } from 'react'
import styleStepper from 'public/scss/components/Stepper.module.scss'

type TypeStepperComponent = {
  title: string
  step: number
}

const StepperComponent: FC<any> = ({
  title,
  step
}: TypeStepperComponent) => {
  const getProgress = () => {
    switch (step) {
      case 1:
        return 33
      case 2:
        return 66
      case 3:
        return 100
      default:
        break
    }
  }

  return (
    <div className={styleStepper.stepper}>
      <h3 className={styleStepper.stepper_title}>
        {title}
      </h3>
      <div className={`${styleStepper.stepper_steps} persentage-${getProgress()}`}>
        <span>{step}</span>
        <div className={`${styleStepper.stepper_percentageBar} ${styleStepper[`percentageBar${getProgress()}`]}`}></div>
      </div>
    </div>
  )
}

export default StepperComponent