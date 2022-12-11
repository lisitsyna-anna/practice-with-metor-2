import { Component } from 'react';
import styles from './Modal.module.css';

export class Modal extends Component {
  closeByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  closeByBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeByEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeByEsc);
  }
  render() {
    const {
      currentImg: { src, alt },
      onClose,
    } = this.props;
    return (
      <div className={styles.backdrop} onClick={this.closeByBackdrop}>
        <div className={styles.modal}>
          <img src={`https://image.tmdb.org/t/p/w500${src}`} alt={alt} />
          <button className={styles.btnClose} type="button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    );
  }
}
