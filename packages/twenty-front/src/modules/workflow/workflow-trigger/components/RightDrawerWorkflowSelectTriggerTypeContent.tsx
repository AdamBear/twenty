import { useFilteredObjectMetadataItems } from '@/object-metadata/hooks/useFilteredObjectMetadataItems';
import { useRightDrawer } from '@/ui/layout/right-drawer/hooks/useRightDrawer';
import { RightDrawerPages } from '@/ui/layout/right-drawer/types/RightDrawerPages';
import {
  WorkflowTriggerType,
  WorkflowWithCurrentVersion,
} from '@/workflow/types/Workflow';
import { workflowSelectedNodeState } from '@/workflow/workflow-diagram/states/workflowSelectedNodeState';
import { RightDrawerStepListContainer } from '@/workflow/workflow-steps/components/RightDrawerWorkflowSelectStepContainer';
import { RightDrawerWorkflowSelectStepTitle } from '@/workflow/workflow-steps/components/RightDrawerWorkflowSelectStepTitle';
import { DATABASE_TRIGGER_TYPES } from '@/workflow/workflow-trigger/constants/DatabaseTriggerTypes';
import { OTHER_TRIGGER_TYPES } from '@/workflow/workflow-trigger/constants/OtherTriggerTypes';
import { TRIGGER_STEP_ID } from '@/workflow/workflow-trigger/constants/TriggerStepId';
import { useUpdateWorkflowVersionTrigger } from '@/workflow/workflow-trigger/hooks/useUpdateWorkflowVersionTrigger';
import { getTriggerDefaultDefinition } from '@/workflow/workflow-trigger/utils/getTriggerDefaultDefinition';
import { useSetRecoilState } from 'recoil';
import { MenuItemCommand, useIcons } from 'twenty-ui';

export const RightDrawerWorkflowSelectTriggerTypeContent = ({
  workflow,
}: {
  workflow: WorkflowWithCurrentVersion;
}) => {
  const { getIcon } = useIcons();
  const { updateTrigger } = useUpdateWorkflowVersionTrigger({ workflow });

  const { activeObjectMetadataItems } = useFilteredObjectMetadataItems();

  const { openRightDrawer } = useRightDrawer();
  const setWorkflowSelectedNode = useSetRecoilState(workflowSelectedNodeState);

  const handleTriggerTypeClick = ({
    type,
    defaultLabel,
    icon,
  }: {
    type: WorkflowTriggerType;
    defaultLabel: string;
    icon: string;
  }) => {
    return async () => {
      await updateTrigger(
        getTriggerDefaultDefinition({
          defaultLabel,
          type,
          activeObjectMetadataItems,
        }),
      );

      setWorkflowSelectedNode(TRIGGER_STEP_ID);

      openRightDrawer(RightDrawerPages.WorkflowStepEdit, {
        title: defaultLabel,
        Icon: getIcon(icon),
      });
    };
  };

  return (
    <RightDrawerStepListContainer>
      <RightDrawerWorkflowSelectStepTitle>
        Data
      </RightDrawerWorkflowSelectStepTitle>
      {DATABASE_TRIGGER_TYPES.map((action) => (
        <MenuItemCommand
          key={action.defaultLabel}
          LeftIcon={getIcon(action.icon)}
          text={action.defaultLabel}
          onClick={handleTriggerTypeClick(action)}
        />
      ))}
      <RightDrawerWorkflowSelectStepTitle>
        Others
      </RightDrawerWorkflowSelectStepTitle>
      {OTHER_TRIGGER_TYPES.map((action) => (
        <MenuItemCommand
          key={action.defaultLabel}
          LeftIcon={getIcon(action.icon)}
          text={action.defaultLabel}
          onClick={handleTriggerTypeClick(action)}
        />
      ))}
    </RightDrawerStepListContainer>
  );
};
