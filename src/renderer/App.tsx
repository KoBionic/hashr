import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RefreshIcon from '@mui/icons-material/Refresh';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Fab from '@mui/material/Fab';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepContent from '@mui/material/StepContent';
import Stepper from '@mui/material/Stepper';
import React, { useEffect, useState } from 'react';
import AlgorithmChooser from 'renderer/components/AlgorithmChooser';
import FileChooser from 'renderer/components/FileChooser';
import Footer from 'renderer/components/Footer';
import HashingProcess from 'renderer/components/HashingProcess';
import { useFile } from 'renderer/components/providers/FileProvider';
import useDrag from 'renderer/hooks/useDrag';
import 'renderer/theme/global.css';

function preventDragEvent(e: React.DragEvent<HTMLElement>): boolean {
  e.preventDefault();

  return false;
}

const App: React.FC = () => {
  const titles = ['Drag & Drop File', 'Select Hashing Algorithm', 'Process'];
  const isDragged = useDrag();
  const [file] = useFile();
  const [activeStep, setActiveStep] = useState(0);
  const [comparison, setComparison] = useState('');
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
            defaultValue={comparison}
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
        sx={{
          paddingX: 3,
          paddingY: 2,
        }}
      >
        <Stepper activeStep={activeStep} orientation="vertical">
          {titles.map((label, index) => {
            const isActive = activeStep === index;

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
                  color="inherit"
                  disabled={isProcessing || activeStep <= index}
                  onClick={handleSelectStep(index)}
                  sx={{
                    '&>span': {
                      textAlign: 'center',
                      width: '100%',
                      fontWeight: 'bold',
                      ...(isActive
                        ? {
                            fontWeight: 'bold',
                          }
                        : {}),
                    },
                  }}
                >
                  {label}
                </StepButton>
                <StepContent>
                  <Box
                    alignItems="center"
                    display="flex"
                    flex={1}
                    justifyContent="center"
                    margin={2}
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
