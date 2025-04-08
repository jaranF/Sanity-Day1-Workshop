import {defineField, defineType} from "sanity";
import * as icons from "@sanity/icons";
/* Full List of Icons as of time of writing (@sanity/icons@3.7.0)

AccessDeniedIcon      ActivityIcon      AddCircleIcon      AddCommentIcon      AddDocumentIcon      AddIcon      AddUserIcon      ApiIcon
ArchiveIcon           ArrowDownIcon     ArrowLeftIcon      ArrowRightIcon      ArrowTopRightIcon    ArrowUpIcon  AsteriskIcon      BarChartIcon
BasketIcon            BellIcon          BillIcon           BinaryDocumentIcon  BlockContentIcon     BlockElementIcon BlockquoteIcon BoldIcon
BoltIcon              BookIcon          BookmarkFilledIcon BookmarkIcon        BottleIcon           BugIcon       BulbFilledIcon   BulbOutlineIcon
CalendarIcon          CaseIcon          ChartUpwardIcon    CheckmarkCircleIcon CheckmarkIcon        ChevronDownIcon ChevronLeftIcon ChevronRightIcon
ChevronUpIcon         CircleIcon        ClipboardIcon      ClipboardImageIcon  ClockIcon            CloseCircleIcon CloseIcon       CodeBlockIcon
CodeIcon              CogIcon           CollapseIcon       ColorWheelIcon      CommentIcon          ComponentIcon  ComposeIcon      ComposeSparklesIcon
ConfettiIcon          ControlsIcon      CopyIcon           CreditCardIcon      CropIcon             CubeIcon       DashboardIcon    DatabaseIcon
DesktopIcon           DiamondIcon       DocumentIcon       DocumentPdfIcon     DocumentRemoveIcon   DocumentSheetIcon DocumentTextIcon DocumentVideoIcon
DocumentWordIcon      DocumentZipIcon   DocumentsIcon      DotIcon             DoubleChevronDownIcon DoubleChevronLeftIcon DoubleChevronRightIcon DoubleChevronUpIcon
DownloadIcon          DragHandleIcon    DropIcon           EarthAmericasIcon   EarthGlobeIcon       EditIcon       EllipsisHorizontalIcon EllipsisVerticalIcon
EmptyIcon             EnterIcon         EnterRightIcon     EnvelopeIcon        EqualIcon            ErrorFilledIcon ErrorOutlineIcon ErrorScreenIcon
ExpandIcon            EyeClosedIcon     EyeOpenIcon        FaceHappyIcon       FaceIndifferentIcon  FaceSadIcon    FeedbackIcon      FilterIcon
FolderIcon            GenerateIcon      GithubIcon         GroqIcon            HashIcon             HeartFilledIcon HeartIcon        HelpCircleIcon
HighlightIcon         HomeIcon          IceCreamIcon       Icon                ImageIcon            ImageRemoveIcon ImagesIcon       InboxIcon
InfoFilledIcon        InfoOutlineIcon   InlineElementIcon  InlineIcon          InsertAboveIcon      InsertBelowIcon ItalicIcon       JoystickIcon
JsonIcon              LaunchIcon        LeaveIcon          LemonIcon           LinkIcon             LinkRemovedIcon LinkedinIcon     ListIcon
LockIcon              LogoJsIcon        LogoTsIcon         MarkerIcon          MarkerRemovedIcon    MasterDetailIcon MenuIcon        MicrophoneIcon
MicrophoneSlashIcon   MobileDeviceIcon  MoonIcon           NumberIcon          OkHandIcon           OlistIcon      OverageIcon       PackageIcon
PanelLeftIcon         PanelRightIcon    PauseIcon          PinFilledIcon       PinIcon              PinRemovedIcon  PlayIcon         PlugIcon
PresentationIcon      Progress50Icon    Progress75Icon     ProjectsIcon        PublishIcon          ReadOnlyIcon    RedoIcon         RefreshIcon
RemoveCircleIcon      RemoveIcon        ResetIcon          RestoreIcon         RetrieveIcon         RetryIcon       RevertIcon       RobotIcon
RocketIcon            SchemaIcon        SearchIcon         SelectIcon          ShareIcon            SortIcon        SparkleIcon      SparklesIcon
SpinnerIcon           SplitHorizontalIcon SplitVerticalIcon SquareIcon         StackCompactIcon     StackIcon       StarFilledIcon   StarIcon
StopIcon              StrikethroughIcon StringIcon         SunIcon             SyncIcon             TabletDeviceIcon TagIcon         TagsIcon
TargetIcon            TaskIcon          TerminalIcon       TextIcon            ThLargeIcon          ThListIcon      ThumbsDownIcon   ThumbsUpIcon
TiersIcon             TimelineIcon      ToggleArrowRightIcon TokenIcon          TransferIcon         TranslateIcon   TrashIcon        TrendUpwardIcon
TriangleOutlineIcon   TrolleyIcon       TruncateIcon       TwitterIcon         UlistIcon            UnarchiveIcon   UnderlineIcon    UndoIcon
UnknownIcon           UnlinkIcon        UnlockIcon         UnpublishIcon       UploadIcon           UserIcon        UsersIcon        VersionsIcon
VideoIcon             WarningFilledIcon WarningOutlineIcon WrenchIcon          icons
*/
export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  icon: icons.ClockIcon,
  groups: [
    {name: "details", title: "Details"},
    {name: "editorial", title: "Editorial"}
  ],
  fields: [
    defineField({
      name: "name",
      type: "string",
      group: ["details", "editorial"]
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {source: "name"},
      validation: (rule) => rule.required().error(`Required to generate a slug on the website`),
      hidden: ({document}) => {
        return !document?.name;
      },
      group: "details"
    }),
    defineField({
      name: "eventType",
      type: "string",
      options: {
        list: ["in-person", "virtual"],
        layout: "radio"
      },
      group: "details"
    }),
    defineField({
      name: "date",
      type: "datetime",
      group: "details"
    }),
    defineField({
      name: "doorsOpen",
      description: "Number of minutes before the start time for admission",
      type: "number",
      placeholder: "60 minutes",
      group: "details"
    }),
    defineField({
      name: "venue",
      type: "reference",
      to: [{type: "venue"}],
      readOnly: ({value, document}) => !value && document?.eventType === "virtual",
      validation: (rule) =>
        rule.custom((value, context) => {
          if (value && context?.document?.eventType === "virtual") return "Only in-person events can have a venue";
          return true;
        }),
      group: "details"
    }),
    defineField({
      name: "headline",
      type: "reference",
      to: [{type: "artist"}],
      group: "details"
    }),
    defineField({
      name: "image",
      type: "image",
      group: "editorial"
    }),
    defineField({
      name: "details",
      type: "array",
      of: [{type: "block"}],
      group: "editorial"
    }),
    defineField({
      name: "tickets",
      type: "url",
      group: "details"
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "headline.name",
      media: "image"
    }
  }
});
