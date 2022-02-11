import { pipe, flow } from 'fp-ts/function';
import * as O from 'fp-ts/Option';

type Settings = {
  font?: {
    size?: number;
    face?: string;
  };
};

const settings: Settings = {
  font: {
    size: 14,
  },
};

const getFontSettingsP = (settings?: Settings) =>
  pipe(
    settings,
    O.fromNullable,
    O.map((settings) => settings.font),
    O.chain(flow(O.fromNullable))
  );

const getFontFace = (settings?: Settings) =>
  pipe(
    settings,
    getFontSettingsP,
    O.map((font) => font.face),
    O.chain(flow(O.fromNullable))
  );

const maybeSettings = (settings: Settings | null | undefined) =>
  O.fromNullable(settings);

const getFontSettingsF = flow(
  maybeSettings,
  O.map((settings) => settings.font)
);

console.log(getFontSettingsP(settings));
console.log(getFontSettingsP({}));
console.log(getFontFace(settings));
const res = pipe(
  getFontFace({
    ...settings,
    font: { ...settings.font, face: 'Times new roman' },
  }),
  O.fold(
    () => console.log('there is no spoon'),
    (settings) => settings
  )
);

const byTypingFlowIsCumbersome = flow<
  [number | null],
  O.Option<NonNullable<number>>,
  O.Option<number>
>(
  O.fromNullable,
  O.map((num) => num + 1)
);

console.log(byTypingFlowIsCumbersome(4));