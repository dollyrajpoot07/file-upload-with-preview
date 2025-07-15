'use client';
import { useState } from 'react';
import styles from './fileUploadWithPreview.module.css';
import Image from 'next/image';

export default function FileUploadWithPreview() {
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState('');

    const handleChange = (e) => {
        const selected = e.target.files[0];
        setFile(selected);

        if (selected && selected.type.startsWith('image')) {
            const reader = new FileReader();
            reader.onloadend = () => setPreview(reader.result);
            reader.readAsDataURL(selected);
        } else {
            setPreview('');
        }
    };

    return (
        <div className={styles.container}>
            <h2>📁 File Upload with Preview</h2>
            <input type="file" onChange={handleChange} />
            {file && (
                <div className={styles.previewSection}>
                    {preview ? (
                        <Image
                            src={preview}
                            alt="preview"
                            width={300}
                            height={200}
                            className={styles.imagePreview}
                        />
                    ) : (
                        <p className={styles.fileInfo}>Uploaded: {file.name}</p>
                    )}
                </div>
            )}
        </div>
    );
}
