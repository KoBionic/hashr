import { Input, InputLabel, LinearProgress } from '@material-ui/core';
import * as bytes from 'bytes';
import * as React from 'react';
import { CryptoService } from '../../../electron/services';
import { CommonTypes, Events, HashingTypes, Toasts } from '../../../models';
import { EventService } from '../../../services';
import * as styles from './HashingProcess.css';

type Props = {
    comparison?: string;
    file: CommonTypes.File;
    hashingAlgorithm: string;
    onProcess: (processing: boolean) => void;
};

type State = {
    hashResult?: HashingTypes.Result;
    isError: boolean;
    progress: number;
};

class HashingProcess extends React.Component<Props, State> {

    public state: State;

    private cryptoService: CryptoService;

    constructor(props: Props) {
        super(props);
        this.state = {
            isError: false,
            progress: 0,
        };
        this.cryptoService = CryptoService.Instance;
        this.updateProgress = this.updateProgress.bind(this);
    }

    componentDidMount = () => {
        EventService.subscribe(Events.UPDATE_PROGRESS, this.updateProgress);
        this.props.onProcess(true);
        this.cryptoService
            .hashFile(this.props.file.path, this.props.hashingAlgorithm, this.props.comparison)
            .then(res => {
                this.setState({ hashResult: res });
                this.props.onProcess(false);

                if (this.props.comparison) {
                    this.props.comparison === this.state.hashResult.hash
                        ? EventService.emit(Events.SHOW_MESSAGE, 'Hashes are equal!', { type: Toasts.SUCCESS, duration: 2500 })
                        : EventService.emit(Events.SHOW_MESSAGE, 'Hashes are different!', { type: Toasts.WARN, duration: 2500 });

                } else {
                    EventService.emit(Events.SHOW_MESSAGE, 'Hash generated!', { type: Toasts.INFO, duration: 2500 });
                }
            })
            .catch(err => {
                this.setState({ isError: true });
                this.props.onProcess(false);
                EventService.emit(Events.SHOW_MESSAGE, 'An error occured!', { type: Toasts.ERROR });
            });
    }

    componentWillUnmount = () => {
        EventService.unsubscribe(Events.UPDATE_PROGRESS, this.updateProgress);
    }

    render = () => (
        <div>
            <div className={styles.progressBar}>
                <LinearProgress
                    color={this.state.isError ? 'primary' : 'secondary'}
                    style={
                        this.state.isError ? {
                            backgroundColor: 'var(--md-primary-red)',
                            filter: 'contrast(50%) brightness(125%)',
                        } : undefined
                    }
                    variant="determinate"
                    value={this.state.progress}
                />
            </div>
            <div className={styles.results}>
                <div>
                    <InputLabel>Algorithm</InputLabel>
                    <Input
                        value={this.props.hashingAlgorithm}
                    />
                </div>
                <div>
                    <InputLabel>File</InputLabel>
                    <Input
                        value={this.props.file.name}
                    />
                </div >
                <div>
                    <InputLabel>Size</InputLabel>
                    <Input
                        value={bytes(this.props.file.size)}
                    />
                </div >
                <div>
                    <InputLabel>Duration</InputLabel>
                    <Input
                        disabled={this.state.hashResult ? false : true}
                        value={this.state.hashResult ? this.state.hashResult.duration : ''}
                    />
                </div >
                <div>
                    <InputLabel>Hash</InputLabel>
                    <Input
                        className={
                            this.state.hashResult
                                ? this.props.comparison
                                    ? this.props.comparison === this.state.hashResult.hash
                                        ? styles.sameHashes
                                        : styles.differentHashes
                                    : styles.noComparisonHash
                                : ''
                        }
                        disabled={this.state.hashResult ? false : true}
                        value={this.state.hashResult ? this.state.hashResult.hash : ''}
                    />
                </div >
                {this.props.comparison && <div>
                    <InputLabel>Comparison</InputLabel>
                    <Input
                        value={this.props.comparison ? this.props.comparison : ''}
                    />
                </div>
                }
            </div >
        </div >
    );

    private updateProgress = (progress: number) => {
        this.setState({
            progress: progress,
        });
    }

}

export default HashingProcess;
