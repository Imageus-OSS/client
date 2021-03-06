import '../../scss/invite-area.scss';
import { Button, message } from 'antd';
import { IoClipboardOutline } from 'react-icons/io5';
import TextInput from '../TextInput';

// prettier-ignore
const copyToClipboard = (text: string) => new Promise((resolve: (value: void) => void, reject) => {
  // Fallback in case navigator.clipboard isn't available
  // for the current browser
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!navigator.clipboard) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
      document.execCommand('copy');
    } catch (err) {
      reject(err);
      return;
    }

    document.body.removeChild(textArea);
    resolve();
    return;
  }

  navigator.clipboard.writeText(text).then(resolve).catch(reject);
});

type InviteAreaProps = {
  inviteCode: string;
  groupId: string;
};

function InviteArea({ inviteCode = '', groupId = '' }: InviteAreaProps): JSX.Element {
  const inviteLink = `imageus.io/invite/${inviteCode}?groupId=${groupId}`;

  const copyCode = () => {
    if (!inviteCode || !groupId) {
      return;
    }

    copyToClipboard(`https://www.${inviteLink}`)
      .then(() => message.success('Link copied to clipboard.'))
      .catch(() => message.error('Error copying code.'));
  };

  return (
    <div className="invite-area">
      <p className="title">Invite Link</p>
      <div className="input-wrapper">
        <TextInput
          className="invite-link-input"
          value={inviteCode && groupId ? inviteLink : ''}
          readOnly
        />
        <Button className="clipboard-btn" onClick={copyCode}>
          <IoClipboardOutline className="clipboard-icon" size={20} />
        </Button>
      </div>
      <p className="description">
        Once you join or create a group, you&apos;ll receive an invite link to
        share and invite other members.
      </p>
    </div>
  );
}

export default InviteArea;
