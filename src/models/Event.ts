const Event = {
  CHECK_FILE_REQUEST: 'check-file-request',
  CHECK_FILE_RESPONSE: 'check-file-response',
  HASH_FILE_ERROR: 'hash-file-error',
  HASH_FILE_PROGRESS_RESPONSE: 'hash-file-progress-response',
  HASH_FILE_REQUEST: 'hash-file-request',
  LIST_ALGORITHMS_REQUEST: 'list-algorithms-request',
  LIST_ALGORITHMS_RESPONSE: 'list-algorithms-response',
  OPEN_IN_EXTERNAL_BROWSER_REQUEST: 'open-in-external-browser-request',
} as const;

export default Event;
