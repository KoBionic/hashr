import {
  Box,
  createStyles,
  CssBaseline,
  Fab,
  makeStyles,
  Step,
  StepButton,
  StepContent,
  Stepper,
} from '@material-ui/core';
import { ArrowDownward as ArrowDownwardIcon, Refresh as RefreshIcon } from '@material-ui/icons';
import AlgorithmChooser from 'components/AlgorithmChooser';
import FileChooser from 'components/FileChooser';
import Footer from 'components/Footer';
import HashingProcess from 'components/HashingProcess';
import { useFile } from 'components/providers/FileProvider';
import useDrag from 'hooks/useDrag';
import React, { useEffect, useState } from 'react';
import 'theme/global.css';

function preventDragEvent(e: React.DragEvent<HTMLElement>): boolean {
  e.preventDefault();
  return false;
}

const useStyles = makeStyles(
  createStyles({
    stepButton: {
      '&>span': {
        width: '100%',
      },
    },
  }),
);

const App: React.FC = () => {
  const classes = useStyles();
  const titles = ['Drag & Drop File', 'Select Hashing Algorithm', 'Process'];
  const isDragged = useDrag();
  const [file] = useFile();
  const [activeStep, setActiveStep] = useState(0);
  const [comparison, setComparison] = useState<string>();
  const [isFinished, setIsFinished] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleComparisonChange = (value: string) => setComparison(value);
  const handleChangeStep = (selector?: '+' | '-') => () => {
    if (!isProcessing && file) {
      const nextStep =
        selector === '+'
          ? activeStep < titles.length - 1
            ? activeStep + 1
            : 0
          : activeStep === 0
          ? 0
          : activeStep - 1;
      setActiveStep(nextStep);
      setIsFinished(false);
    }
  };
  const handleSelectStep = (step: number) => () => setActiveStep(step);
  const handleKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        handleChangeStep('+')();
        break;
      case 'ArrowUp':
        handleChangeStep('-')();
        break;
      case 'Backspace':
        handleChangeStep('-')();
        break;
      case 'Enter':
        handleChangeStep('+')();
        break;
      case 'Escape':
        handleChangeStep('-')();
        break;
      default:
    }
  };
  const handleProcess = (isProcessing: boolean) => {
    setIsProcessing(isProcessing);
    setIsFinished(!isProcessing);
  };
  const getStepContent = (step: number) => {
    let content: JSX.Element | null;
    switch (step) {
      case 0:
        content = (
          <FileChooser
            active={activeStep === 0}
            defaultValue={comparison as string}
            file={file}
            onComparisonChange={handleComparisonChange}
          />
        );
        break;
      case 1:
        content = <AlgorithmChooser />;
        break;
      case 2:
        content = <HashingProcess onProcess={handleProcess} comparison={comparison} />;
        break;
      default:
        content = null;
    }
    return content;
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeydown);
      return () => {
        window.removeEventListener('keydown', handleKeydown);
      };
    }
  }, [handleKeydown]);
  return (
    <>
      <CssBaseline />
      <Box
        onDragEnd={preventDragEvent}
        onDragLeave={preventDragEvent}
        onDragOver={preventDragEvent}
        onDragStart={preventDragEvent}
        onDrop={preventDragEvent}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {titles.map((label, index) => {
            let shouldHideFab: boolean;
            switch (activeStep) {
              case 0:
                shouldHideFab = isDragged;
                break;
              case 1:
                shouldHideFab = false;
                break;
              case 2:
                shouldHideFab = isProcessing;
                break;
              default:
                shouldHideFab = false;
            }
            return (
              <Step completed={activeStep > index || isFinished} key={label}>
                <StepButton
                  className={classes.stepButton}
                  disabled={isProcessing || activeStep <= index}
                  onClick={handleSelectStep(index)}
                >
                  {label}
                </StepButton>
                <StepContent>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    margin={2}
                    flex={1}
                  >
                    {getStepContent(index)}
                  </Box>
                  <Box marginRight={2} marginTop="22px" textAlign="right">
                    <Fab
                      color="secondary"
                      disabled={!file}
                      onClick={handleChangeStep('+')}
                      size="small"
                      style={{
                        animation: !file || shouldHideFab ? 'unset' : 'pulse 1.5s infinite',
                        boxShadow: '0 0 0 rgba(var(--md-primary-white-rgb), 0.5)',
                        opacity: shouldHideFab ? 0 : 1,
                        transition: [
                          'background-color 250ms var(--animation-cubic-bezier)',
                          'box-shadow 250ms var(--animation-cubic-bezier)',
                          'opacity 250ms var(--animation-cubic-bezier)',
                        ].join(', '),
                      }}
                    >
                      {activeStep + 1 !== titles.length ? <ArrowDownwardIcon /> : <RefreshIcon />}
                    </Fab>
                  </Box>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Footer />
    </>
  );
};

App.displayName = 'App';

export default App;
