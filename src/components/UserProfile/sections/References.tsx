import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { RecommendationPreview } from '../../Recommendation/RecommendationPreview';
import type { Reference } from '../../../types/reference';

interface ReferencesProps {
  references: Reference[];
  pendingReferences?: Reference[];
  isOwner: boolean;
  onApprove?: (id: string) => void;
  onDecline?: (id: string) => void;
}

export function References({ 
  references, 
  pendingReferences = [], 
  isOwner,
  onApprove,
  onDecline
}: ReferencesProps) {
  if (references.length === 0 && pendingReferences.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>References</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground py-8">
            No references yet
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>References</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="approved">
          <TabsList>
            <TabsTrigger value="approved">
              Approved ({references.length})
            </TabsTrigger>
            {isOwner && pendingReferences.length > 0 && (
              <TabsTrigger value="pending">
                Pending ({pendingReferences.length})
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="approved">
            <div className="space-y-4">
              {references.map((reference) => (
                <RecommendationPreview
                  key={reference.id}
                  recommendation={reference}
                />
              ))}
            </div>
          </TabsContent>

          {isOwner && (
            <TabsContent value="pending">
              <div className="space-y-4">
                {pendingReferences.map((reference) => (
                  <RecommendationPreview
                    key={reference.id}
                    recommendation={reference}
                    onApprove={() => onApprove?.(reference.id)}
                    onDecline={() => onDecline?.(reference.id)}
                    isPending
                  />
                ))}
              </div>
            </TabsContent>
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}