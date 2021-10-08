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
        return "30"
      case 2:
        return "60"
      case 3:
        return "100"
      default:
        break
    }
  }

  return (
    <div className={styleStepper.stepper}>
      <h3 className={styleStepper.stepper_title}>
        {title}
      </h3>
      <div 
        className={styleStepper.progress_circle} 
        data-percentage={getProgress()}
      >
        <span className={styleStepper.progress_circleLeft}>
          <span className={styleStepper.progress_circleBar}></span>
        </span>
        <span className={styleStepper.progress_circleRight}>
          <span className={styleStepper.progress_circleBar}></span>
        </span>
        <div className={styleStepper.progress_circleValue}>
          <div>
            <span>{step}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StepperComponent