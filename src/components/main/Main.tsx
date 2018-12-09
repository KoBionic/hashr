import { Button, Step, StepContent, StepLabel, Stepper } from '@material-ui/core';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import GetAppIcon from '@material-ui/icons/GetApp';
import RefreshIcon from '@material-ui/icons/Refresh';
import React from 'react';
import { FileService } from '../../electron/services';
import { CommonTypes, HashingTypes } from '../../models';
import AlgorithmChooser from './algorithm-chooser/AlgorithmChooser';
import FileChooser from './file-chooser/FileChooser';
import HashingProcess from './hashing-process/HashingProcess';
import * as styles from './Main.css';

type State = {
    activeStep: number;
    canContinue: boolean;
    chosenAlgorithm: string;
    chosenFile?: CommonTypes.File;
    comparison?: string;
    isDragged: boolean;
    isFinished: boolean;
};

class Main extends React.Component<object, State> {

    public state: State;
    public titles: string[];

    constructor(props: object) {
        super(props);
        this.state = {
            activeStep: 0,
            canContinue: false,
            chosenAlgorithm: HashingTypes.Algorithm.SHA256,
            isDragged: false,
            isFinished: false,
        };
        this.titles = [
            'Drag & Drop File',
            'Select Hashing Algorithm',
            'Process',
        ];
    }

    componentDidMount = () => {
        window.addEventListener('drop', e => this.handleDrag(e, false), false);
        window.addEventListener('dragenter', e => this.handleDrag(e, true), false);
        window.addEventListener('dragleave', e => { if (!e.clientX && !e.clientY) this.handleDrag(e, false); }, false);
        window.addEventListener('keydown', e => this.handleKeydown(e), false);
    };

    render = () => {
        const { activeStep } = this.state;
        return (
            <div>
                <Stepper
                    activeStep={activeStep}
                    orientation="vertical"
                >
                    {this.titles.map((label, index) => {
                        const attributes = index + 1 === this.titles.length
                            ? { completed: this.state.isFinished }
                            : {};

                        return (
                            <Step
                                key={label}
                                className={`${styles.step} ${this.state.isDragged ? styles.noPointerEvents : ''}`}
                                {...attributes}
                            >
                                <StepLabel
                                    className={index === activeStep ? styles.activeTitle : ''}
                                >
                                    {label}
                                </StepLabel>
                                <StepContent>
                                    <div className={styles.stepContent}>
                                        {this.getStepContent(index)}
                                        {index === 0 &&
                                            <div
                                                className={`${styles.dropzone} ${this.state.isDragged ? styles.ondrag : ''}`}
                                                onDrop={this.handleDrop}
                                            >
                                                <GetAppIcon nativeColor="white" className={styles.dropzoneIcon} />
                                            </div>
                                        }
                                    </div>
                                    <div
                                        className={styles.navigationButton}
                                    >
                                        <Button
                                            disabled={!this.state.canContinue ? true : false}
                                            className={this.state.canContinue && !this.state.isDragged ? styles.pulse : styles.faded}
                                            color="secondary"
                                            variant="fab"
                                            mini={true}
                                            onClick={e => this.changeStep('+')}
                                        >
                                            {
                                                activeStep + 1 !== this.titles.length
                                                    ? <ArrowDownwardIcon />
                                                    : <RefreshIcon />
                                            }
                                        </Button>
                                    </div>
                                </StepContent>
                            </Step>
                        );
                    })}
                </Stepper>
            </div>
        );
    };

    private changeStep = (selector?: '+' | '-') => {
        if (this.state.canContinue) {
            const newStep = selector === '+'
                ? this.state.activeStep < this.titles.length - 1
                    ? ++this.state.activeStep
                    : 0
                : this.state.activeStep === 0
                    ? 0
                    : --this.state.activeStep;

            this.setState({
                activeStep: newStep,
                isFinished: false,
            });
        }
    };

    private handleDrag = (event: Event, isDragged: boolean) => {
        event.preventDefault();
        this.setState({ isDragged: isDragged });
    };

    private handleDrop = (event: React.DragEvent<any>) => {
        event.preventDefault();
        const dropped = event.dataTransfer.files[0];
        const file = {
            lastModified: dropped.lastModified,
            name: dropped.name,
            path: dropped.path,
            size: dropped.size,
            type: dropped.type,
        };
        FileService
            .isFile(file.path)
            .then(isFile => {
                if (isFile) this.setState({ canContinue: true, chosenFile: file });
            })
            .catch();
    };

    private handleKeydown = (event: KeyboardEvent) => {
        switch (event.key) {
            case 'ArrowDown':
                this.changeStep('+');
                break;
            case 'ArrowUp':
                this.changeStep('-');
                break;
            case 'Backspace':
                this.changeStep('-');
                break;
            case 'Enter':
                this.changeStep('+');
                break;
            default:
        }
    };

    private getStepContent = (step: number) => {
        let content;
        switch (step) {
            case 0:
                content = (
                    <FileChooser
                        chosenFile={this.state.chosenFile}
                        compareTo={val => this.setState({ comparison: val })}
                        initialValue={this.state.comparison}
                    />
                );
                break;
            case 1:
                content = (
                    <AlgorithmChooser
                        chosenAlgorithm={this.state.chosenAlgorithm}
                        onChange={val => this.setState({ chosenAlgorithm: val })}
                    />
                );
                break;
            case 2:
                content = (
                    <HashingProcess
                        file={this.state.chosenFile}
                        hashingAlgorithm={this.state.chosenAlgorithm}
                        onProcess={processing => this.setState({ canContinue: !processing, isFinished: !processing })}
                        comparison={this.state.comparison}
                    />
                );
                break;
            default:
        }
        return content;
    };

}

export default Main;
