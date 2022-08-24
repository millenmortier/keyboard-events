import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiGithub, FiTrash2 } from 'react-icons/fi';
import styles from './styles';

import Checkbox from './components/Checkbox';
import Select from './components/Select';
import Logo from './components/Logo';
import ColorModeToggleButton from './components/ColorModeToggleButton';
import Table from './components/Table';
import IconButton from './components/IconButton';
import Kbd from './components/Kbd';
import Code from './components/Code';
import Footer from './components/Footer';
import Button from './components/Button';
import InfoPopover from './components/InfoPopover';
import Tooltip from './components/Tooltip';

import HStack from './layout/HStack';
import Container from './layout/Container';

type KeyBEventOptions = 'keydown' | 'keyup' | 'keypress';
interface KeyBSettings {
  shouldPreventDefault: boolean;
  eventName: KeyBEventOptions;
}

const defaultSettings = {
  eventName: 'keydown',
  shouldPreventDefault: true,
} as KeyBSettings;

const MainSection = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 4rem;
  background-color: var(--background-color);
`;

const TextSection = styled.section`
  margin-bottom: 4rem;
`;

const Header = styled.header`
  width: 100%;
  padding: 2rem 0;

  @media (min-width: ${styles.breakpoints.sm}) {
    padding: 4rem 0;
  }
`;

const LogoContainer = styled.div`
  margin-bottom: 2rem;

  @media (min-width: ${styles.breakpoints.sm}) {
    margin-bottom: 4rem;
  }
`;

const CheckboxLabel = styled.label`
  display: flex;
  height: 40px;
  align-items: center;
  box-sizing: border-box;
  padding: 0 1rem 0 0.875rem;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  transition: 0.15s border-color;
  cursor: pointer;

  :hover {
    border-color: var(--color-brand-primary);
  }

  > :first-child {
    margin-right: 0.5rem;
  }
`;

const TableEmpty = styled.div`
  padding: 4rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;
  color: var(--color-n-500);
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;

  @media (min-width: ${styles.breakpoints.sm}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const StyledTable = styled(Table)`
  th:nth-child(3),
  th:nth-child(4),
  th:nth-child(6),
  td:nth-child(3),
  td:nth-child(4),
  td:nth-child(6) {
    display: none;
  }

  th,
  td {
    width: calc(100% / 3);
  }

  @media (min-width: ${styles.breakpoints.sm}) {
    th,
    td {
      display: table-cell !important;
      width: 100% / 6;
    }
  }
`;

const LS_KEY = 'keybevents_settings';
function loadSettingsFromLocalStorage() {
  const saved = window.localStorage.getItem(LS_KEY);
  if (saved) {
    return JSON.parse(saved) as KeyBSettings;
  } else {
    return { ...defaultSettings };
  }
}

function saveSettingsToLocalStorage(settings: KeyBSettings) {
  window.localStorage.setItem(LS_KEY, JSON.stringify(settings));
}

function App() {
  const [events, setEvents] = useState<KeyboardEvent[]>([]);
  const [shouldPreventDefault, setShouldPreventDefault] = useState(
    defaultSettings.shouldPreventDefault
  );
  const [rowsShown, setRowsShown] = useState(10);
  const [eventName, setEventName] = useState<KeyBEventOptions>(
    defaultSettings.eventName
  );

  useEffect(() => {
    const handleKeydown = (ev: KeyboardEvent) => {
      if (shouldPreventDefault) {
        ev.preventDefault();
      }

      const {
        code,
        keyCode,
        key,
        location,
        altKey,
        ctrlKey,
        metaKey,
        shiftKey,
        repeat,
      } = ev;
      setEvents((events) => [
        {
          ...ev,
          code,
          keyCode,
          key,
          location,
          altKey,
          ctrlKey,
          metaKey,
          shiftKey,
          repeat,
        },
        ...events,
      ]);
    };

    document.addEventListener(eventName, handleKeydown);
    return () => document.removeEventListener(eventName, handleKeydown);
  }, [eventName, shouldPreventDefault]);

  useEffect(() => {
    const settings = loadSettingsFromLocalStorage();
    setEventName(settings?.eventName);
    setShouldPreventDefault(settings?.shouldPreventDefault);
  });

  const locationTexts = ['Standard', 'Left', 'Right', 'NumPad'];

  return (
    <>
      <MainSection>
        <Header>
          <Container size="lg">
            <LogoContainer>
              <Logo />
            </LogoContainer>

            <ButtonContainer>
              <HStack gap={4}>
                <Select
                  value={eventName}
                  onChange={(ev) => {
                    const newValue = ev.target.value as KeyBEventOptions;
                    setEventName(newValue);
                    saveSettingsToLocalStorage({
                      eventName: newValue,
                      shouldPreventDefault,
                    });
                  }}
                  options={['keydown', 'keyup']}
                />

                <CheckboxLabel>
                  <Checkbox
                    checked={shouldPreventDefault}
                    onChange={(ev) => {
                      const shouldPreventDefault = ev.target.checked;
                      setShouldPreventDefault(shouldPreventDefault);
                      saveSettingsToLocalStorage({
                        eventName,
                        shouldPreventDefault,
                      });
                    }}
                  />
                  Prevent default
                </CheckboxLabel>
              </HStack>

              <HStack gap={4}>
                <Tooltip label={`Color mode`}>
                  <ColorModeToggleButton />
                </Tooltip>

                <IconButton>
                  <FiGithub />
                </IconButton>
              </HStack>
            </ButtonContainer>
          </Container>
        </Header>

        <Container size="lg">
          <StyledTable columns={6}>
            <thead>
              <tr>
                <th>key</th>
                <th>code</th>
                <th>
                  <del>keyCode</del>{' '}
                  <Tooltip label="Deprecated. Use `key` or `code` instead">
                    <FiTrash2 size="1rem" style={{ verticalAlign: '-3px' }} />
                  </Tooltip>
                </th>
                <th>
                  location{' '}
                  <InfoPopover>
                    <p>
                      The <code>location</code> property indicates where the key
                      is located on the keyboard. It is returned as a number,
                      and can be one of the following values:
                    </p>
                    <ul>
                      <li>0: Standard</li>
                      <li>1: Left</li>
                      <li>2: Right</li>
                      <li>3: NumPad</li>
                    </ul>
                  </InfoPopover>
                </th>
                <th>
                  modifiers{' '}
                  <InfoPopover>
                    <p>
                      Keyboard events contain information on whether the Ctrl,
                      Alt/Option, Shift, or Windows/Command keys were held
                      during the keyboardEvent, in the boolean properties{' '}
                      <code>ctrlKey</code>, <code>altKey</code>,{' '}
                      <code>shiftKey</code>, and <code>metaKey</code>,
                      respectively.
                    </p>
                  </InfoPopover>
                </th>
                <th>repeat</th>
              </tr>
            </thead>
            <tbody>
              {!events.length && (
                <tr>
                  <td colSpan={6}>
                    <TableEmpty>
                      Start typing on your keyboard - the generated events will
                      show up here!
                    </TableEmpty>
                  </td>
                </tr>
              )}
              {events.slice(0, rowsShown).map((ev, index) => (
                <tr key={index}>
                  <td>
                    <Kbd>{ev.key}</Kbd>
                  </td>
                  <td>
                    <Code>{ev.code}</Code>
                  </td>
                  <td>{ev.keyCode}</td>
                  <td>{locationTexts[ev.location]}</td>
                  <td>
                    {ev.altKey && <Kbd>Alt</Kbd>}{' '}
                    {ev.ctrlKey && <Kbd>Ctrl</Kbd>}{' '}
                    {ev.shiftKey && <Kbd>Shift</Kbd>}{' '}
                    {ev.metaKey && <Kbd>Meta</Kbd>}
                  </td>
                  <td>{ev.repeat && '✅'}</td>
                </tr>
              ))}
            </tbody>

            {events.length > rowsShown && (
              <tfoot>
                <tr>
                  <td colSpan={6}>
                    <Button small onClick={() => setRowsShown(rowsShown + 10)}>
                      Show more
                    </Button>
                  </td>
                </tr>
              </tfoot>
            )}
          </StyledTable>
        </Container>
      </MainSection>

      <TextSection>
        <Container size="lg">
          <h1>Background</h1>
          <p>
            You might be thinking: "keyboard events are that complicated,
            right?" Well, for the most part, you <em>are</em> right. But certain
            things can make it a bit annoying at times:
          </p>

          <ul>
            <li>
              Different (deprecated) props with similar names doing very (kind
              of) similar things: <code>code</code>, <code>keyCode</code>,{' '}
              <code>key</code>, etc., and what is their exact value?
            </li>
            <li>
              Non-alphanumeric keys, and what they contain exactly: does the
              space bar result in <code>"' '"</code> or <code>"Space"</code>?
              What does the left arrow key contain? (<code>"Left"</code>,{' '}
              <code>"left"</code>,<code>"ArrowLeft"</code> would all be
              reasonable values)
            </li>
            <li>
              Keyboards come in all different shapes and sizes; some keyboards
              have more keys than others, can be in different languages, etc.
            </li>
          </ul>

          <p>
            To help with these things, I made this simple tool; so you can be
            quickly reminded of which properties to use when working with
            keyboard events (and more importantly, why), and which values these
            properties will contain.
          </p>

          <p>
            To make life even easier, here are a few key takeaways to keep in
            mind when working with keyboard events:
          </p>

          <blockquote>
            <h2>"Key" takeaways</h2>
            <ul>
              <li>
                Either use the <code>keydown</code> or <code>keyup</code>{' '}
                events. There's also a <code>keypress</code> event, but it is
                deprecated.
              </li>
              <li>
                When identifying which key has been pressed, always use either{' '}
                <code>key</code> or <code>code</code>; <code>keyCode</code> is{' '}
                <strong>deprecated</strong> and shouldn't be used
              </li>
              <li>
                <code>key</code>: best used when you're mostly interested in the
                contents of the pressed key. For example, <code>key</code> can
                be used to distinguish between "1" and "!", or "a" and "A".
              </li>
              <li>
                <code>code</code>: best used when you're mostly interested in
                the actual key on the keyboard. <code>code</code> will only tell
                you which physical key was pressed. For example, whether you've
                typed a "1" or a "!", <code>code</code> will give you "Digit1"
                in both cases.
              </li>
            </ul>
          </blockquote>
        </Container>
      </TextSection>

      <Footer>
        <Container size="lg">
          Made with ❤️ and 🍔 by <a>Millen Mortier</a>
        </Container>
      </Footer>
    </>
  );
}

export default App;
